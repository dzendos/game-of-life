/*
 * Game Of Life API
 *
 * The game of life api that allows you to compute the next state of some population.  ### Check out its features:  * Send the state of the game to evaluate 🧬 * Send query to change number of replicas 📈
 *
 * API version: 1.0.0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

const (
	cols = 50
	rows = 30
)

type mapElement struct {
	RowIndex        int  `json:"rowIndex"`
	ColumnIndex     int  `json:"columnIndex"`
	IsAlive         bool `json:"isAlive"`
	NeighboursCount int
}

type mapPart struct {
	Map []mapElement `json:"Map"`
}

func willBeAlive(element *mapElement) bool {
	if element.IsAlive {
		return element.NeighboursCount == 2 ||
			element.NeighboursCount == 3
	}

	return element.NeighboursCount == 3
}

func evaluateNextGeneration(mapPart *[]mapElement) {
	newMapPart := []mapElement{}

	positions := make(map[[2]int]bool)
	for _, cell := range *mapPart {
		positions[[2]int{cell.RowIndex, cell.ColumnIndex}] = cell.IsAlive
	}

	for i, cell := range *mapPart {
		counter := 0

		for k := 0; k < 9; k++ {
			if k == 4 {
				continue
			}
			y := k / 3
			x := k % 3

			deltaX := x - 1
			deltaY := y - 1

			newX := cell.ColumnIndex + deltaX
			newY := cell.RowIndex + deltaY

			if newX < 0 {
				newX = cols - 1
			} else if newX >= cols {
				newX = 0
			}
			if newY < 0 {
				newY = rows - 1
			} else if newY >= rows {
				newY = 0
			}

			isAlive, exists := positions[[2]int{newY, newX}]
			if !exists {
				break
			}

			counter++
			if isAlive {
				(*mapPart)[i].NeighboursCount++
			}

		}

		if counter == 8 {
			newMapPart = append(newMapPart, (*mapPart)[i])
			newMapPart[len(newMapPart)-1].IsAlive = willBeAlive(&newMapPart[len(newMapPart)-1])
		}

		time.Sleep(2 * time.Millisecond)
	}

	*mapPart = newMapPart
}

func NextGen(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")

	mapPart := mapPart{}
	err := json.NewDecoder(r.Body).Decode(&mapPart)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	evaluateNextGeneration(&mapPart.Map)

	jsonBytes, err := json.Marshal(mapPart)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}
