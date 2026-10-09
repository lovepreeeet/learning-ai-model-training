const game = document.querySelector("#game");
const dinosaur = document.querySelector("#dinosaur");
const obstacle = document.querySelector("#obstacle");
const message = document.querySelector("#message");
const scoreDisplay = document.querySelector("#score");
const startButton = document.querySelector("#start-button");

const groundY = 0;
const jumpStrength = 15;
const gravity = 0.8;
const speed = 5;

let dinosaurY = groundY;
let velocityY = 0;

let isJumping = false;
// The game waits for the Start button, so it begins as "over"
let gameOver = true;
let hasStarted = false;

let obstacleX = game.clientWidth;

let passedObstacle = false;

// Gap between dino and obstacle at the moment of the last jump
let jumpDistance = null;

const minObstacleHeight = 20;
const maxObstacleHeight = 90;
let obstacleHeight = 50;

// Obstacles cleared in the current play, and every jump made in it
let score = 0;
let playObstacles = [];


// -------------------------
// DATASET
// -------------------------

function randomizeObstacleHeight() {
    obstacleHeight = Math.round(
        minObstacleHeight +
        Math.random() * (maxObstacleHeight - minObstacleHeight)
    );
    obstacle.style.height = obstacleHeight + "px";
}

// Distance from dino's right edge to obstacle's left edge,
// measured the same way as jumpDistance in the dataset
export function getObstacleDistance() {
    return Math.round(
        obstacle.getBoundingClientRect().left -
        dinosaur.getBoundingClientRect().right
    );
}

export function getObstacleHeight() {
    return obstacleHeight;
}

// Sends [distanceFromObstacle, height, passed] to dino-server.js.
// Each jump is recorded once: passed, collided, or landed with nothing passed.
function recordSample(passed) {
    if (jumpDistance === null) {
        return;
    }

    const sample = [
        Math.round(jumpDistance),
        obstacleHeight,
        passed ? 1 : 0
    ];

    jumpDistance = null;

    playObstacles.push({
        distance: sample[0],
        height: sample[1],
        passed: sample[2]
    });

    console.log("sample: ", sample);

    fetch("http://localhost:3000/record", {
        method: "POST",
        body: JSON.stringify(sample)
    }).catch((error) => console.error("Failed to record: ", error));
}

// -------------------------
// SCORE
// -------------------------

function updateScoreDisplay() {
    scoreDisplay.textContent = "Score: " + score;
}

// Sends the finished play to dino-server.js (static/scores.json)
function recordScore() {
    const play = {
        score,
        playedAt: new Date().toISOString(),
        obstacles: playObstacles
    };

    console.log("play: ", play);

    fetch("http://localhost:3000/score", {
        method: "POST",
        body: JSON.stringify(play)
    }).catch((error) => console.error("Failed to record score: ", error));
}

let animationId;


// -------------------------
// JUMP
// -------------------------

export function jump() {
    if (gameOver || isJumping) {
        return;
    }

    velocityY = jumpStrength;
    isJumping = true;

    jumpDistance = getObstacleDistance();
}


// -------------------------
// KEYBOARD
// -------------------------

document.addEventListener("keydown", (event) => {

    if (event.code === "Space") {
        event.preventDefault();
        jump();
    }

    if (event.code === "Enter" && gameOver && hasStarted) {
        restartGame();
    }
});


// -------------------------
// RESTART
// -------------------------

function restartGame() {

    cancelAnimationFrame(animationId);

    dinosaurY = groundY;
    velocityY = 0;

    isJumping = false;
    gameOver = false;
    hasStarted = true;
    startButton.disabled = true;

    obstacleX = game.clientWidth;

    passedObstacle = false;
    jumpDistance = null;

    score = 0;
    playObstacles = [];
    updateScoreDisplay();

    randomizeObstacleHeight();

    dinosaur.style.bottom = dinosaurY + "px";
    obstacle.style.left = obstacleX + "px";

    message.textContent = "Press Space to jump";

    gameLoop();
}

// -------------------------
// GAME LOOP
// -------------------------

function gameLoop() {

    if (gameOver) {
        return;
    }


    // -------------------------
    // Dinosaur jump physics
    // -------------------------

    if (isJumping) {

        dinosaurY += velocityY;

        velocityY -= gravity;


        if (dinosaurY <= groundY) {

            dinosaurY = groundY;
            velocityY = 0;

            isJumping = false;

            // Landed without passing the obstacle — a normal jump
            recordSample(false);
        }

        dinosaur.style.bottom = dinosaurY + "px";
    }


    // -------------------------
    // Move obstacle
    // -------------------------

    obstacleX -= speed;


    // -------------------------
    // Reset obstacle
    // -------------------------

    if (obstacleX < -30) {

        obstacleX = game.clientWidth;

        passedObstacle = false;
        jumpDistance = null;

        randomizeObstacleHeight();
    }

    obstacle.style.left = obstacleX + "px";


    // -------------------------
    // Check collision
    // -------------------------

    const dinoRect =
        dinosaur.getBoundingClientRect();

    const obstacleRect =
        obstacle.getBoundingClientRect();


    const collided =
        dinoRect.right > obstacleRect.left &&
        dinoRect.left < obstacleRect.right &&
        dinoRect.bottom > obstacleRect.top &&
        dinoRect.top < obstacleRect.bottom;


    if (collided) {

        gameOver = true;

        console.log("GAME OVER");

        recordSample(false);
        recordScore();

        message.textContent =
            "Game over — score " + score + " — press Enter to restart";

        startButton.textContent = "Restart game";
        startButton.disabled = false;

        return;
    }


    // -------------------------
    // Check if obstacle passed
    // -------------------------

    if (
        !passedObstacle &&
        obstacleX + 30 < 80
    ) {

        passedObstacle = true;
        // console.log('obstacleX: ', obstacleX);
        // console.log('speed: ', speed);
        // console.log('obstacleRect.left: ', obstacleRect.left);

        console.log("Passed obstacle!");
        console.log('Jumped at distance: ', jumpDistance, 'px');

        recordSample(true);

        score++;
        updateScoreDisplay();
    }


    // -------------------------
    // Continue game
    // -------------------------

    animationId =
        requestAnimationFrame(gameLoop);
}


startButton.addEventListener("click", () => {
    // Keep Space for jumping instead of re-clicking the button
    startButton.blur();
    restartGame();
});


// Wait for the Start button
updateScoreDisplay();
randomizeObstacleHeight();
obstacle.style.left = obstacleX + "px";
