import { restart, step, currentState } from "./maze.js";
import "./style.css";
import { chooseAction, getStateAsString } from "./model.js";

// let INITIAL_STATE = currentState;

// let {} = chooseAction(getStateAsString(INITIAL_STATE))

document.querySelector(".move_btn").addEventListener("click", () => {
    console.log('currentState: ', currentState);
    let { action } = chooseAction(getStateAsString(currentState), false)
    let { nextState, reward, done } = step(action)
    console.log({ action, nextState, reward, done })
})