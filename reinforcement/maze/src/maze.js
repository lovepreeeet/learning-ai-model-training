// 0 = open cell, 1 = wall
// walls are fixed, only start/end points change on every refresh
export const MAZE = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

export const ROWS = MAZE.length;
export const COLS = MAZE[0].length;

export const ACTIONS = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
}

export const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isWall = (row, col) => {
    return MAZE[row][col] === 1;
}

const isOutside = (row, col) => {
    return row < 0 || row >= ROWS || col < 0 || col >= COLS;
}

const randomOpenCell = () => {
    let openCells = [];
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (!isWall(row, col)) {
                openCells.push({ row, col });
            }
        }
    }
    return openCells[randomNumberBetween(0, openCells.length - 1)];
}

export const START_STATE = randomOpenCell();

let endState = randomOpenCell();
while (endState.row === START_STATE.row && endState.col === START_STATE.col) {
    endState = randomOpenCell();
}
export const END_STATE = endState;

export const move = (currentState, action) => {
    let nextRow = currentState.row;
    let nextCol = currentState.col;

    if (action === ACTIONS.UP) {
        nextRow -= 1;
    } else if (action === ACTIONS.DOWN) {
        nextRow += 1;
    } else if (action === ACTIONS.LEFT) {
        nextCol -= 1;
    } else if (action === ACTIONS.RIGHT) {
        nextCol += 1;
    }

    // hit the boundary or a wall, stay at the same place
    if (isOutside(nextRow, nextCol) || isWall(nextRow, nextCol)) {
        return {
            nextState: currentState,
            reward: -1,
            done: false,
        }
    }

    let nextState = { row: nextRow, col: nextCol };

    if (nextRow === END_STATE.row && nextCol === END_STATE.col) {
        return {
            nextState,
            reward: 10,
            done: true,
        }
    }

    return {
        nextState,
        reward: -1,
        done: false,
    }
}





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

export let currentState = START_STATE;
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
            div.innerHTML = `<span> ${row}:${col} </span>`
            div.className = "cell";
            if (cell === 1) div.classList.add("wall");
            if (row === END_STATE.row && col === END_STATE.col) div.classList.add("end");
            if (row === currentState.row && col === currentState.col) div.classList.add("player");
            board.appendChild(div);
        });
    });

    info.textContent = gameOver
        ? `You won in ${steps} steps! Total reward: ${totalReward}. Press R to play again.`
        : `Steps: ${steps} | Total reward: ${totalReward}`;
}

// moves the player on the screen, unlike move() which only calculates the result
export const step = (action) => {
    if (gameOver) {
        return {
            nextState: currentState,
            reward: 0,
            done: true,
        }
    }

    const { nextState, reward, done } = move(currentState, action);
    currentState = nextState;
    totalReward += reward;
    steps++;
    gameOver = done;
    render();

    return { nextState, reward, done };
}

// puts the player at a random open cell, the end point stays the same (so a trained Q-table still works)
export const restart = () => {
    let newState = randomOpenCell();
    while (newState.row === END_STATE.row && newState.col === END_STATE.col) {
        newState = randomOpenCell();
    }

    currentState = newState;
    totalReward = 0;
    steps = 0;
    gameOver = false;
    render();

    return currentState;
}

window.addEventListener("keydown", (event) => {
    if (event.key === "r") {
        restart();
        return;
    }

    const action = KEY_TO_ACTION[event.key];
    if (!action) return;
    event.preventDefault();
    step(action);
});

render();
