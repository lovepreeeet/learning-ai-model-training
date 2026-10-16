// Let's move to actual Q-learning now
// You've spent enough time on action selection. We can improve it later if needed.
// The next loop will be:
// 1. Start at state 0.
// 2. Choose an action using chooseAction().
// 3. Call move(currentState, action).
// 4. Receive nextState, reward, and done.
// 4.5 NEW -> get the futureBestReward for next move (futureBestReward(nextState)) and use this to update qValue (in next step, use the below formul);
// 5. Update the Q-value for the action you just took.
// 6. Move to nextState and repeat until done is true.


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
