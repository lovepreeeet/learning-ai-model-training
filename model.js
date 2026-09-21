const LEARNING_RATE = 0.01;
const traningData = {
    1: 30,
    2: 40,
    3: 50,
    4: 60,
    5: 70,
}

let weight = 0;
let bias = 0;

let x = 4;

let actualValue = traningData[4];

function predict(x, weight, bias) {
    return (weight * x) + bias;
}

let prediction = predict(x, weight, bias);


function calculateLoss(actual, predicted) {
    return (actual - predicted) ** 2
}

console.log('prediction: ', prediction);

let loss = calculateLoss(actualValue, prediction);
console.log('loss: ', loss);


// dLoss/dWeight = -2 × hours × (actual - prediction)
let gradient = -2 * x * (actualValue - prediction);
console.log('gradient: ', gradient);

weight = weight - (LEARNING_RATE * gradient);
console.log('weight: ', weight);

prediction = predict(x, weight, bias);
console.log('prediction: ', prediction);


function train() {

}