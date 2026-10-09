import { jump, getObstacleDistance, getObstacleHeight } from "./dino-game.js";
import { shouldJump } from "./model.js"
import "./score-history.js";



let animationId;

let isJumping = false;

const aiLoop = () => {
    let obstacleDistance = getObstacleDistance()
    let obstacleHeight = getObstacleHeight();


    if (shouldJump(obstacleDistance, obstacleHeight) && isJumping === false) {
        // console.log("jump plz")
        isJumping = true;
        jump();
    }
    isJumping = false;

    animationId =
        requestAnimationFrame(aiLoop);
}

aiLoop();