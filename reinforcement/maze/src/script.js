import { MAZE, ACTIONS, START_STATE, END_STATE, move } from "./maze.js";
import "./style.css";
import "./model.js"

const KEY_TO_ACTION = {
    ArrowUp: ACTIONS.UP,
    ArrowDown: ACTIONS.DOWN,
    ArrowLeft: ACTIONS.LEFT,
    ArrowRight: ACTIONS.RIGHT,
    w: ACTIONS.UP,
    s: ACTIONS.DOWN,
    a: ACTIONS.LEFT,
    d: ACTIONS.RIGHT,
}

let currentState = START_STATE;
let totalReward = 0;
let steps = 0;
let gameOver = false;

const board = document.createElement("div");
board.className = "board";
board.style.gridTemplateColumns = `repeat(${MAZE[0].length}, 1fr)`;

const info = document.createElement("p");
info.className = "info";

document.body.append(board, info);

const render = () => {
    board.innerHTML = "";
    MAZE.forEach((rowCells, row) => {
        rowCells.forEach((cell, col) => {
            const div = document.createElement("div");
            div.className = "cell";
            if (cell === 1) div.classList.add("wall");
            if (row === END_STATE.row && col === END_STATE.col) div.classList.add("end");
            if (row === currentState.row && col === currentState.col) div.classList.add("player");
            board.appendChild(div);
        });
    });

    info.textContent = gameOver
        ? `You won in ${steps} steps! Total reward: ${totalReward}. Refresh to play again.`
        : `Steps: ${steps} | Total reward: ${totalReward}`;
}

window.addEventListener("keydown", (event) => {
    const action = KEY_TO_ACTION[event.key];
    if (!action || gameOver) return;
    event.preventDefault();

    const { nextState, reward, done } = move(currentState, action);
    currentState = nextState;
    totalReward += reward;
    steps++;
    gameOver = done;
    render();
});

render();
