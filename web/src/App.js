import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/logo.svg";
import start from "./images/start.svg";
import nodes from "./images/nodes.svg";
import pause from "./images/pause.svg";
import RangeSlider from "react-bootstrap-range-slider";
import { useAsyncEffect, useAsyncCallback } from "use-async-effect2";

function App() {
  const host = 'http://localhost:52116'
  const configHost = 'http://localhost:8080'

  const [value2, setValue2] = React.useState(1);
  const [showButton, setShowButton] = useState(true);

  const handleClick = () => {
    setShowButton(!showButton);
  };

  const rows = 30;
  const cols = 50;
  const [squares, setSquares] = useState(Array(rows * cols).fill(false));

  const clickedSquare = (index, square) => {
    if (!showButton) return;
    const newSquares = [...squares];
    newSquares[index] = !square;
    setSquares(newSquares);
  };

  const renderSquares = () => {
    return squares.map((square, index) => (
      <div
        key={index}
        className={`square ${square ? "selected" : ""}`}
        onClick={() => {
          clickedSquare(index, square);
        }}
      ></div>
    ));
  };

  const handleRange = () => {
    fetch(configHost + '/setReplicasNumber', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ReplicasNumber: value2 })
    })
      .then((response) => response.status)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  const toMapArray = (Squares) => {
    const mapArray = [];
  
    for (let i = 0; i < Squares.length; i++) {
        const y = Math.floor(i / cols);
        const x = i % cols;
        const map = {
          rowIndex: y,
          columnIndex: x,
          isAlive: Squares[y * cols + x]
        };
  
        mapArray.push(map);
    }
  
    return mapArray;
  }

  async function handleEvaluation() {
    const n = value2; 
    const Map = toMapArray(squares);

    const chunkSize = Math.floor(Map.length / n); 
    let squareChunks = []; 

    for (let i = 0; i < Map.length; i += chunkSize) {
      let chunk = []
      for (let j = 0; j < chunkSize; j++) {
        if (i + j === 1500) {
          break;
        }
        if (!chunk.includes(Map[i + j])) {
          chunk.push(Map[i + j]);
        }
        

        let element = Map[i + j];

        for (let k = 0; k < 9; k++) {
          let y = Math.floor(k / 3);
          let x = k % 3;
  
          let deltaX = x - 1;
          let deltaY = y - 1;
  
          let newX = element.columnIndex + deltaX;
          let newY = element.rowIndex + deltaY;

          if (newX < 0) {
            newX = cols - 1;
          } else if (newX >= cols) {
            newX = 0;
          }
          if (newY < 0) {
            newY = rows - 1;
          } else if (newY >= rows) {
            newY = 0;
          }

          if (!chunk.includes(Map[newY * cols + newX])) {
            chunk.push(Map[newY * cols + newX]);
          }
        }
      }

      squareChunks.push(chunk);
    }

    const promises = [];
    for (let i = 0; i < squareChunks.length; i++) {
      const promise = fetch(host + '/evaluateNextGeneration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Map: squareChunks[i] })
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then((data) => {
        return data.Map;
      })
      promises.push(promise);
    }
  
    return Promise.all(promises)
    .then((responses) => {
      const arr = [];

      responses.forEach((response) => {
        arr.push(...response);
      });

      const res = Array(rows * cols).fill(false)

      for (let i = 0; i < arr.length; i++) {
        const index = arr[i].rowIndex * cols + arr[i].columnIndex;
        res[index] = arr[i].isAlive;
      }
      console.log('done')
      
      setSquares(res);
    })
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    async function startFetching() {
      if (!ignore && !showButton) {
        console.log('start')
        let result = await handleEvaluation();
        console.log('end', result)
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }
  }, [showButton, squares, value2]);

  return (
    <div className="App">
      <div className="header">
        <div className="header__left">
          <img className="header__image" src={logo} alt="logo" />
        </div>
        <div className="header__right">
          <div className="header__right__nodes">
            <div className="header__right__nodes__label">
              <img src={nodes} alt="number of nodes" />
            </div>
            <div className="header__right__nodes__change">
              <RangeSlider
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                onAfterChange={handleRange}
                tooltip="off"
                bsPrefix="slider"
                min={1}
                style={{ backgroundColor: "white" }}
              />
              <p className="slider__text">{value2}</p>
            </div>
          </div>
          <div className="header__right__start">
            {showButton && (
              <button
                className="header__right__start__button"
                onClick={handleClick}
              >
                <img
                  className="header__right__start__button__image"
                  src={start}
                  alt="start"
                />
              </button>
            )}
            {!showButton && (
              <button
                className="header__right__start__button"
                onClick={handleClick}
              >
                <img
                  className="header__right__start__button__image"
                  src={pause}
                  alt="pause"
                />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="parent">
        <div className="table">{renderSquares()}</div>
      </div>
    </div>
  );
}

export default App;
