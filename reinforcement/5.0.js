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


// target = reward + (discountFactor * futureBestValue);
// qValue = qOld + learningRate (target - qOld); so this is the new formula 

// futureBestRewardValue for when done === true, should be 0 as there's no reward for next state;
// in this code, we are having only 1 epoch, 6.0.js will be having multi epoch (multiple episodes)

const DISCOUNT_FACTOR = 0.9;
// Value	Meaning
// 0	Ignores future rewards
// 0.5	Values future rewards less
// 0.9	Values future rewards considerably
// 0.99	Values future rewards very strongly
const LEARNING_RATE = 0.1;
// The learning rate controls how much the agent changes its existing estimate each time it learns.
// - Too low: learning can be slow.
// - Too high: updates can be unstable, especially in more complex problems.
// - A moderate value: often a useful starting point.
const ACTIONS = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
}
// - Discount factor: how much future rewards matter.
// - Learning rate: how much Q-values change during each update.
// - Exploration: how the agent discovers which actions are good.

// 5. One final piece: training must explore
// There's one issue worth knowing before you train hundreds of episodes.
// Your current chooseAction() picks the highest Q-value, with random selection when values tie. Once one action has a slightly higher value, it may keep choosing that action and stop trying alternatives.
// This is the exploration vs. exploitation problem:
// - Exploration: try actions to discover whether they're good.
// - Exploitation: choose the action currently believed to be best.

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


let currentState = 0;

while (true) {
    var { action, value } = chooseAction(currentState);
    console.log('action, value: ', action, value);

    var { nextState, reward, done } = move(currentState, action);
    console.log('nextState, reward, done: ', nextState, reward, done);

    const futureBestRewardValue = done ? 0 : futureBestValue(nextState);
    console.log('futureBestRewardValue: ', futureBestRewardValue);

    const target = reward + (DISCOUNT_FACTOR * futureBestRewardValue);
    qTable[currentState][action] += LEARNING_RATE * (target - qTable[currentState][action])

    currentState = nextState;
    console.log('currentState: ', currentState);

    if (done) {
        break;
    }

}

console.log('FINAL qTable: ', qTable);
