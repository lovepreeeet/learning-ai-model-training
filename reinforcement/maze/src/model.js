import { ACTIONS, currentState, MAZE, move, randomNumberBetween } from "./maze";

const Q_TABLE = {};

// CONFIG
const CONFIG = {
    EPSILON: 1,
    MIN_EPSILON: 0.01,
    EPSILON_DECAY: 0.995,
    DISCOUNT_FACTOR: 0.9,
    LEARNING_RATE: 0.1,
}


MAZE.forEach((rowCells, row) => {
    rowCells.forEach((cell, col) => {
        // console.log(col, "isWall", cell === 1)
        Q_TABLE[`${row}:${col}`] = {
            [ACTIONS.DOWN]: 0,
            [ACTIONS.RIGHT]: 0,
            [ACTIONS.LEFT]: 0,
            [ACTIONS.UP]: 0
        }
    })
})


export const chooseAction = (currentState, trainingMode = true) => {
    if (!trainingMode) {
        CONFIG.EPSILON = 0;
    }
    let ACTIONS_AVAILABLE = Object.keys(ACTIONS)
    const currentStateActions = Q_TABLE[currentState];


    let randomActionChosen = ACTIONS_AVAILABLE[randomNumberBetween(0, ACTIONS_AVAILABLE.length - 1)]

    let bestSoFar = {
        action: randomActionChosen,
        value: currentStateActions[randomActionChosen],
    }

    if (Math.random() < CONFIG.EPSILON) {
        return bestSoFar;
    }

    ACTIONS_AVAILABLE.forEach(key => {
        if (currentStateActions[key] > bestSoFar.value) {
            bestSoFar = {
                action: key,
                value: currentStateActions[key],
            }
        }
    })
    return bestSoFar;
}

const futureBestValue = (state) => {
    return Math.max(...Object.values(Q_TABLE[state]))
}

export const getStateAsString = (state) => {
    return `${state.row}:${state.col}`;
}


let i = 0;
while (i < 1000) {
    let INITIAL_STATE = currentState;

    while (true) {
        let stateAsStr = getStateAsString(INITIAL_STATE);

        let { action, value } = chooseAction(stateAsStr);

        let { nextState, reward, done } = move(INITIAL_STATE, action);

        const futureBestRewardValue = done ? 0 : futureBestValue(getStateAsString(nextState));

        const target = reward + (CONFIG.DISCOUNT_FACTOR * futureBestRewardValue);

        Q_TABLE[stateAsStr][action] += CONFIG.LEARNING_RATE * (target - Q_TABLE[stateAsStr][action]);

        INITIAL_STATE = nextState

        if (done) {
            break;
        }
    }

    CONFIG.EPSILON = Math.max(CONFIG.MIN_EPSILON, (CONFIG.EPSILON * CONFIG.EPSILON_DECAY));

    i++;
}
console.log('FINAL qTable: ', Q_TABLE);
