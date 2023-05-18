# Game Of Life

## Goal/Tasks of the Project

The goal of implementing the Game of Life is to create a functional and visually engaging simulation that accurately follows the rules of Conway's Game of Life. The Game of Life is a cellular automaton where cells on a grid evolve based on a set of predefined rules. The objective is to create an environment where cells can live, die, and reproduce according to these rules.


## Execution plan/Methodology

Here is a scheme illustrating how our project works: ![Project Scheme](img/project.jpg)

## Development of solution/Tests as the PoC

- Project requirements: `kubectl`, `minikube`

- Start order of the backend part:

    1. In the `game-of-life` folder, run:
    ```bash
    kubectl apply -f deployment.yml -f service.yml
    ```
    2. After that, run:
    ```bash
    deployment.apps/app-deployment configured service/app unchanged
    ```
    3. Finally, run:
    ```bash
    minikube service app
    ```
- Start order of the frontend part: 

    1. Insert tunnel address into frontend in App.js 'host' variable
    2. Run:
    ```bash
    npm start
    ```


