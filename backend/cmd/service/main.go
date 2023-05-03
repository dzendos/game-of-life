package main

import (
	sw "game-of-life/internal/swagger"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/handlers"
)

func newRouter() http.Handler {
	router := sw.NewRouter()

	cors := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	return cors(router)
}

func main() {
	rand.Seed(time.Now().UnixNano())
	log.Printf("Server started on port 8080")

	router := newRouter()

	log.Fatal(http.ListenAndServe(":8080", router))
}
