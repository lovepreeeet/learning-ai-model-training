// epsilon decaying
// If epsilon starts at 1.0, meaning the agent explores 100% of the time, and gradually decreases toward 0.01, what do you think is the advantage of doing this instead of keeping epsilon at 0.1 for the entire training process?

// 1. Why start with high epsilon and gradually decrease it?
// Exactly: early on, the agent doesn't know which actions are good, so it explores more. As it learns, it can use its Q-values more often to choose actions that lead to better future rewards.
// Think of it this way:
// - Early training (epsilon = 1.0): explore almost everything.
// - Middle training (epsilon = 0.5): balance exploration and using what you've learned.
// - Later training (epsilon = 0.01): mostly use the best-known actions, with occasional exploration.
// These are example values, not mandatory settings.
// 2. What about keeping epsilon at 0.1?
// You made a good point about states potentially remaining at zero, but there's a small distinction.
// With epsilon fixed at 0.1, the agent explores randomly about 10% of the time and exploits its current Q-values about 90% of the time.
// The problem is that the agent might exploit too early, before it has explored enough to discover a better path. It can keep choosing an action that looks good based on incomplete information.
// For example, imagine the agent has two actions:
// Action	Current Q-value
// LEFT	2
// RIGHT	5
// It prefers RIGHT because its Q-value is higher. But what if LEFT eventually leads to a much better reward, and the agent hasn't explored it enough to discover that?
// Starting with high epsilon gives it more chances to discover alternatives before settling into a preferred strategy.
// One important correction: epsilon decay doesn't guarantee that every state gets explored. If a state is never visited, its Q-values can remain zero. We still need sufficient training episodes and exploration.


// when should we update epsilon
// After each complete episode (one run of the maze)

let EPSILON = 1; // start value  
const MIN_EPSILON = 0.01; // minimum 1%
const EPSILON_DECAY = 0.995; // 99.5% // - controls how quickly epsilon decreases.
// EPSILON = Math.max(MIN_EPSILON, (EPSILON * EPSILON_DECAY));

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
    console.log('EPSILON: ', EPSILON);

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
while (i < 1000) { // episodes

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
    EPSILON = Math.max(MIN_EPSILON, (EPSILON * EPSILON_DECAY));
    i++;
}

console.log('FINAL qTable: ', qTable);

