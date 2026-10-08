import data from "../static/dataset.json";

const LEARNING_RATE = 0.01;

let learningData = data.map(item => ({
    distance: item[0],
    height: item[1],
    isPass: item[2],
}))

const prediction = (m1, x1, m2, x2, c) => {
    return (m1 * x1) + (m2 * x2) + c;
}

const calculateLoss = (actual, prediction) => {
    return (actual - prediction) ** 2
}

const mGradient = (m, actual, prediction) => {
    return (-2) * m * (actual - prediction);
}

const cGradient = (actual, prediction) => {
    return -2 * (actual - prediction)
}

const newValue = (oldValue, gradient) => {
    return oldValue - (LEARNING_RATE * gradient);
}


let loss = 0;
let m1 = 0;
let m2 = 0;
let c = 0;

let i = 0;
let MAX_EPOCHS = 1

while (i < MAX_EPOCHS) {
    const totalLoss = 0;
    learningData.map(item => {
        const predict = prediction(m1, item.distance, m2, item.height, c);
        let loss = calculateLoss(item.isPass, predict);
        console.log('loss: ', loss);
    })
    i++;
}

console.log('m1: ', m1);
console.log('m2: ', m2);
console.log('c: ', c);