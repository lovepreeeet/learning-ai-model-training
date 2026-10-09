// import data from "../static/dataset.json";
const response = await fetch("/dataset.json", { cache: "no-store" });
const data = await response.json();


const LEARNING_RATE = 0.01;

let learningData = data.map(item => ({
    x1: item[0],
    x2: item[1],
    c: item[2],
}))

const sigmoid = (prediction) => {
    return 1 / (1 + Math.exp(-prediction))
}

const prediction = (m1, x1, m2, x2, c) => {
    let z = (m1 * x1) + (m2 * x2) + c;
    return sigmoid(z);
}

const calculateLoss = (actual, prediction) => {
    return -(
        actual * Math.log(prediction) +
        (1 - actual) * Math.log(1 - prediction)
    );
}

const mGradient = (x, actual, prediction) => {
    return x * (prediction - actual);
}

const cGradient = (actual, prediction) => {
    return prediction - actual;
}

const newValue = (oldValue, gradient) => {
    return oldValue - (LEARNING_RATE * gradient);
}


let loss = 0;
let m1 = 0;
let m2 = 0;
let c = 0;

let i = 0;
let MAX_EPOCHS = 1000;

while (i < MAX_EPOCHS) {
    const totalLoss = 0;
    learningData.map(item => {
        const predicted = prediction(m1, item.x1, m2, item.x2, c);
        let loss = calculateLoss(item.c, predicted);

        let m1Gradient = mGradient(item.x1, item.c, predicted);
        m1 = newValue(m1, m1Gradient);

        let m2Gradient = mGradient(item.x2, item.c, predicted)

        m2 = newValue(m2, m2Gradient);

        c = newValue(c, cGradient(item.c, predicted));
    })
    i++;
}

console.log('m1: ', m1);
console.log('m2: ', m2);
console.log('c: ', c);


export const shouldJump = (x1, x2) => {
    const output = prediction(m1, x1, m2, x2, c);
    return output >= 0.5 ? 1 : 0
}
