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

const randomNumberBetween = (min, max) => {
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
