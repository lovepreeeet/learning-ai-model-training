// build the q-table

const ACTIONS = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
}
// environment (1.0.js) tells -> You are at position 2 and chose RIGHT. What happened?
// qTable tells -> How good is RIGHT when I'm at position 2?
//           LEFT    RIGHT
// state 0     ?        ?
// state 1     ?        ?
// state 2     ?        ?
// state 3     ?        ?
// state 4     ?        ?
// Initially, we don't know which actions are good.
// So start every Q-value at 0.

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


const move = (currentPosition, action) => {
    if (currentPosition === 0 && action === ACTIONS.LEFT) {
        return {
            nextState: currentPosition,
            reward: 0,
            done: false,
        }
    }
    if (currentPosition === 3 && action === ACTIONS.RIGHT) {
        return {
            nextState: currentPosition,
            reward: 10,
            done: true,
        }
    }

    let nextState = currentPosition;
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