// build just game engine

const ACTIONS = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
    DONE: "DONE",
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