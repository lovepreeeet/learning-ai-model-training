const trainingData = [
    { hours: 2, sleep: 5, result: 0 },
    { hours: 3, sleep: 6, result: 0 },
    { hours: 4, sleep: 7, result: 1 },
    { hours: 5, sleep: 7, result: 1 },
    { hours: 6, sleep: 8, result: 1 },
];

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}


// --------------------
// NEURON 1
// --------------------

function neuron1(hours, sleep) {
    const weightHours = 0.2;
    const weightSleep = 0.3;
    const bias = -1;

    const z =
        (weightHours * hours) +
        (weightSleep * sleep) +
        bias;

    return sigmoid(z);
}


// --------------------
// NEURON 2
// --------------------

function neuron2(hours, sleep) {
    const weightHours = -0.4;
    const weightSleep = 0.8;
    const bias = 0.5;

    const z =
        (weightHours * hours) +
        (weightSleep * sleep) +
        bias;

    return sigmoid(z);
}


// --------------------
// NEURON 3
// --------------------

function neuron3(hours, sleep) {
    const weightHours = 0.7;
    const weightSleep = -0.2;
    const bias = -0.3;

    const z =
        (weightHours * hours) +
        (weightSleep * sleep) +
        bias;

    return sigmoid(z);
}


// --------------------
// OUTPUT NEURON
// --------------------

function predict(hours, sleep) {

    // hidden layer
    const output1 = neuron1(hours, sleep);
    const output2 = neuron2(hours, sleep);
    const output3 = neuron3(hours, sleep);

    // output neuron
    const weight1 = 0.5;
    const weight2 = -0.4;
    const weight3 = 0.8;
    const bias = -0.5;

    const z =
        (weight1 * output1) +
        (weight2 * output2) +
        (weight3 * output3) +
        bias;

    return sigmoid(z);
}


// --------------------
// TEST
// --------------------

const probability = predict(4.5, 7);

console.log("probability:", probability);

const prediction = probability >= 0.5 ? 1 : 0;

console.log("prediction:", prediction);