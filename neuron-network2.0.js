import { sigmoid, calculateLoss, calculateWeightGradient, calculateBias, calculateWeight, calculateBiasGradient } from "./index.js";

const trainingData = [
    { hours: 2, sleep: 5, result: 0 },
    { hours: 2, sleep: 6, result: 0 },
    { hours: 3, sleep: 5, result: 0 },
    { hours: 3, sleep: 6, result: 0 },
    { hours: 4, sleep: 6, result: 1 },
    { hours: 4, sleep: 7, result: 1 },
    { hours: 5, sleep: 6, result: 1 },
    { hours: 5, sleep: 7, result: 1 },
    { hours: 6, sleep: 7, result: 1 },
    { hours: 6, sleep: 8, result: 1 },
];

const neuron1 = {
    weightHours: 0.2,
    weightSleep: 0.3,
    bias: -1
};

const neuron2 = {
    weightHours: -0.4,
    weightSleep: 0.8,
    bias: 0.5
};

const neuron3 = {
    weightHours: 0.7,
    weightSleep: -0.2,
    bias: -0.3
};

const outputNeuron = {
    weight1: 0.5,
    weight2: -0.4,
    weight3: 0.8,
    bias: -0.5
};

let i = 0;

function neuron1Prediction(hours, sleep) {
    let { bias, weightHours, weightSleep } = neuron1;
    let z = (hours * weightHours) + (sleep * weightSleep) + bias;
    return sigmoid(z);
}
function neuron2Prediction(hours, sleep) {
    let { bias, weightHours, weightSleep } = neuron2;
    let z = (hours * weightHours) + (sleep * weightSleep) + bias;
    return sigmoid(z);
}
function neuron3Prediction(hours, sleep) {
    let { bias, weightHours, weightSleep } = neuron3;
    let z = (hours * weightHours) + (sleep * weightSleep) + bias;
    return sigmoid(z);
}
function outputNeuronPrediction(output1, output2, output3) {
    let { bias, weight1, weight2, weight3 } = outputNeuron;

    let z =
        (output1 * weight1) +
        (output2 * weight2) +
        (output3 * weight3) +
        bias;

    return sigmoid(z);
}


let finalLoss;
while (i < 100) {
    let losses = [];
    trainingData.forEach((item) => {
        let { hours, sleep, result } = item;
        let output1 = neuron1Prediction(hours, sleep);
        let output2 = neuron2Prediction(hours, sleep);
        let output3 = neuron3Prediction(hours, sleep);

        let prediction = outputNeuronPrediction(output1, output2, output3);

        let loss = calculateLoss(result, prediction);
        losses.push(loss)

        let weight1Gradient = calculateWeightGradient(output1, result, prediction);
        let weight2Gradient = calculateWeightGradient(output2, result, prediction);
        let weight3Gradient = calculateWeightGradient(output3, result, prediction);

        outputNeuron.weight1 = calculateWeight(outputNeuron.weight1, weight1Gradient)
        outputNeuron.weight2 = calculateWeight(outputNeuron.weight2, weight2Gradient)
        outputNeuron.weight3 = calculateWeight(outputNeuron.weight3, weight3Gradient)

        let biasGradient = calculateBiasGradient(result, prediction);

        outputNeuron.bias = calculateBias(outputNeuron.bias, biasGradient);

        let neuron1HoursWeightGradient = calculateWeightGradient(hours, result, output1);
        let neuron1SleepWeightGradient = calculateWeightGradient(sleep, result, output1);

        let neuron2HoursWeightGradient = calculateWeightGradient(hours, result, output2);
        let neuron2SleepWeightGradient = calculateWeightGradient(sleep, result, output2);

        let neuron3HoursWeightGradient = calculateWeightGradient(hours, result, output3);
        let neuron3SleepWeightGradient = calculateWeightGradient(sleep, result, output3);


        neuron1.weightHours = calculateWeight(neuron1.weightHours, neuron1HoursWeightGradient);
        neuron1.weightSleep = calculateWeight(neuron1.weightSleep, neuron1SleepWeightGradient);

        neuron2.weightHours = calculateWeight(neuron2.weightHours, neuron2HoursWeightGradient);
        neuron2.weightSleep = calculateWeight(neuron2.weightSleep, neuron2SleepWeightGradient);

        neuron3.weightHours = calculateWeight(neuron3.weightHours, neuron3HoursWeightGradient);
        neuron3.weightSleep = calculateWeight(neuron3.weightSleep, neuron3SleepWeightGradient);


        let neuron1BiasGradient = calculateBiasGradient(result, output1);
        let neuron2BiasGradient = calculateBiasGradient(result, output2);
        let neuron3BiasGradient = calculateBiasGradient(result, output3);

        neuron1.bias = calculateBias(neuron1.bias, neuron1BiasGradient);
        neuron2.bias = calculateBias(neuron2.bias, neuron2BiasGradient);
        neuron3.bias = calculateBias(neuron3.bias, neuron3BiasGradient);
    });
    finalLoss = losses.reduce(
        (previousValue, current) => previousValue + current,
        0
    ) / losses.length
    i++;
}

console.log(
    outputNeuron.weight1,
    outputNeuron.weight2,
    outputNeuron.weight3,
    outputNeuron.bias
)
