// Next concept: exploration vs. exploitation
// Imagine a different maze where LEFT initially looks worse than RIGHT, but taking LEFT leads to a hidden shortcut with a large reward.
// If the agent always chooses the action with the highest known Q-value, it might never discover that shortcut.
// that's why we use epsilon-greedy action selection (e = 0.1) // agent explores approximately 10% of the time

const EPSILON = 0.1;
const DISCOUNT_FACTOR = 0.9;
const LEARNING_RATE = 0.1;
const ACTIONS = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
}
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
        [ACTIONS.LEFT]: 0,
        [ACTIONS.RIGHT]: 0,
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
            reward: -1,
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

const randomNumberBetween = (min, max, shouldFloor = true) => {
    let output = Math.random() * (max - min + 1)
    return (shouldFloor ? Math.floor(output) : output) + min;
}

const chooseAction = (currentState) => {
    let actions = Object.keys(ACTIONS);
    let currentStateActions = qTable[currentState];

    if (Math.random() < EPSILON) {
        let chosedAction = actions[randomNumberBetween(0, 1)]
        return {
            action: chosedAction,
            value: currentStateActions[chosedAction]
        }
    }

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
// console.log('chooseAction(2): ', chooseAction(2));

const futureBestValue = (state) => {
    return Math.max(...Object.values(qTable[state]))
}

let i = 0;
while (i < 1000) {

    let currentState = 0;

    while (true) {
        var { action, value } = chooseAction(currentState);

        var { nextState, reward, done } = move(currentState, action);

        const futureBestRewardValue = done ? 0 : futureBestValue(nextState);

        const target = reward + (DISCOUNT_FACTOR * futureBestRewardValue);
        qTable[currentState][action] += LEARNING_RATE * (target - qTable[currentState][action])

        currentState = nextState;

        if (done) {
            break;
        }
    }
    i++;
}

console.log('FINAL qTable: ', qTable);

