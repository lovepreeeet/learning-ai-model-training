// build the q-table

const ACTIONS = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
}
// imagine we are at 2
// qtable says left = 0, right = 0
// agent needs a function that asks -> which action should i take?
// in simple words -> agent looks at qvalues for current state, chooses whichever action have highest q value
// but for starting point, we have everything at 0; ie, there's no best action
// so the action logic (whole) basically is
// 1. Get Q-values for current state.
// 2. Find the highest Q-value.
// 3. If one action has the highest value → choose it.
// 4. If both have the same value → randomly choose one.


const qTable = {
    0: {
        [ACTIONS.LEFT]: 0,
        [ACTIONS.RIGHT]: 0,
    },
    1: {
        [ACTIONS.LEFT]: 0,
        [ACTIONS.RIGHT]: 0,
    },
    2: {
        [ACTIONS.LEFT]: 6,
        [ACTIONS.RIGHT]: 6,
    },
    3: {
        [ACTIONS.LEFT]: 0,
        [ACTIONS.RIGHT]: 0,
    },
}

const move = (currentState, action) => {
    if (currentState === 0 && action === ACTIONS.LEFT) {
        return {
            nextState: currentState,
            reward: 0,
            done: false,
        }
    }
    if (currentState === 3 && action === ACTIONS.RIGHT) {
        return {
            nextState: currentState,
            reward: 10,
            done: true,
        }
    }

    let nextState = currentState;
    let reward = -1;

    if (action === ACTIONS.RIGHT) {
        nextState += 1;
    } else if (action === ACTIONS.LEFT) {
        nextState -= 1;
    }

    return {
        nextState,
        reward,
        done: false,
    }
}

const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const chooseAction = (currentState) => {

    let currentStateActions = qTable[currentState];

    let actions = Object.keys(ACTIONS);

    let bestActionSoFar = actions[randomNumberBetween(0, 1)];

    let bestSoFar = {
        action: bestActionSoFar,
        value: currentStateActions[bestActionSoFar],
    }

    actions.forEach(key => {
        if (currentStateActions[key] > bestSoFar.value) {
            bestSoFar = {
                action: key,
                value: currentStateActions[key],
            }
        }
    })
    return bestSoFar;
}
console.log('chooseAction(2): ', chooseAction(2));