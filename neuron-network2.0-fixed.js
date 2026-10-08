const LEARNING_RATE = 0.01;


// --------------------
// TRAINING DATA
// --------------------

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


// --------------------
// NEURONS
// --------------------

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


// --------------------
// SIGMOID
// --------------------

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}


// derivative of sigmoid
function sigmoidDerivative(output) {
    return output * (1 - output);
}


// --------------------
// LOSS
// --------------------

function calculateLoss(actual, prediction) {
    return (actual - prediction) ** 2;
}


// --------------------
// PREDICTIONS
// --------------------

function neuron1Prediction(hours, sleep) {

    const z =
        (hours * neuron1.weightHours) +
        (sleep * neuron1.weightSleep) +
        neuron1.bias;

    return sigmoid(z);
}


function neuron2Prediction(hours, sleep) {

    const z =
        (hours * neuron2.weightHours) +
        (sleep * neuron2.weightSleep) +
        neuron2.bias;

    return sigmoid(z);
}


function neuron3Prediction(hours, sleep) {

    const z =
        (hours * neuron3.weightHours) +
        (sleep * neuron3.weightSleep) +
        neuron3.bias;

    return sigmoid(z);
}


function outputNeuronPrediction(output1, output2, output3) {

    const z =
        (output1 * outputNeuron.weight1) +
        (output2 * outputNeuron.weight2) +
        (output3 * outputNeuron.weight3) +
        outputNeuron.bias;

    return sigmoid(z);
}


// --------------------
// TRAINING
// --------------------

let epoch = 0;

while (epoch < 1000) {

    let totalLoss = 0;

    trainingData.forEach(({ hours, sleep, result }) => {

        // ==================================================
        // FORWARD PASS
        // ==================================================

        const output1 = neuron1Prediction(hours, sleep);
        const output2 = neuron2Prediction(hours, sleep);
        const output3 = neuron3Prediction(hours, sleep);

        const prediction =
            outputNeuronPrediction(output1, output2, output3);


        // ==================================================
        // LOSS
        // ==================================================

        const loss = calculateLoss(result, prediction);

        totalLoss += loss;


        // ==================================================
        // OUTPUT NEURON GRADIENT
        // ==================================================

        // dLoss / dPrediction
        const predictionGradient =
            2 * (prediction - result);

        // sigmoid derivative
        const outputSigmoidGradient =
            sigmoidDerivative(prediction);

        // dLoss / dz
        const outputGradient = 
        predictionGradient * outputSigmoidGradient;


        // ==================================================
        // OUTPUT NEURON WEIGHT GRADIENTS
        // ==================================================

        const weight1Gradient =
            outputGradient * output1;

        const weight2Gradient =
            outputGradient * output2;

        const weight3Gradient =
            outputGradient * output3;

        const outputBiasGradient =
            outputGradient;


        // ==================================================
        // HIDDEN NEURON GRADIENTS
        // ==================================================

        // --------------------
        // neuron 1
        // --------------------

        const neuron1Gradient =
            outputGradient *
            outputNeuron.weight1 *
            sigmoidDerivative(output1);

        const neuron1HoursGradient =
            neuron1Gradient * hours;

        const neuron1SleepGradient =
            neuron1Gradient * sleep;

        const neuron1BiasGradient =
            neuron1Gradient;


        // --------------------
        // neuron 2
        // --------------------

        const neuron2Gradient =
            outputGradient *
            outputNeuron.weight2 *
            sigmoidDerivative(output2);

        const neuron2HoursGradient =
            neuron2Gradient * hours;

        const neuron2SleepGradient =
            neuron2Gradient * sleep;

        const neuron2BiasGradient =
            neuron2Gradient;


        // --------------------
        // neuron 3
        // --------------------

        const neuron3Gradient =
            outputGradient *
            outputNeuron.weight3 *
            sigmoidDerivative(output3);

        const neuron3HoursGradient =
            neuron3Gradient * hours;

        const neuron3SleepGradient =
            neuron3Gradient * sleep;

        const neuron3BiasGradient =
            neuron3Gradient;


        // ==================================================
        // UPDATE OUTPUT NEURON
        // ==================================================

        outputNeuron.weight1 -=
            LEARNING_RATE * weight1Gradient;

        outputNeuron.weight2 -=
            LEARNING_RATE * weight2Gradient;

        outputNeuron.weight3 -=
            LEARNING_RATE * weight3Gradient;

        outputNeuron.bias -=
            LEARNING_RATE * outputBiasGradient;


        // ==================================================
        // UPDATE NEURON 1
        // ==================================================

        neuron1.weightHours -=
            LEARNING_RATE * neuron1HoursGradient;

        neuron1.weightSleep -=
            LEARNING_RATE * neuron1SleepGradient;

        neuron1.bias -=
            LEARNING_RATE * neuron1BiasGradient;


        // ==================================================
        // UPDATE NEURON 2
        // ==================================================

        neuron2.weightHours -=
            LEARNING_RATE * neuron2HoursGradient;

        neuron2.weightSleep -=
            LEARNING_RATE * neuron2SleepGradient;

        neuron2.bias -=
            LEARNING_RATE * neuron2BiasGradient;


        // ==================================================
        // UPDATE NEURON 3
        // ==================================================

        neuron3.weightHours -=
            LEARNING_RATE * neuron3HoursGradient;

        neuron3.weightSleep -=
            LEARNING_RATE * neuron3SleepGradient;

        neuron3.bias -=
            LEARNING_RATE * neuron3BiasGradient;

    });


    // --------------------
    // AVERAGE LOSS
    // --------------------

    const averageLoss =
        totalLoss / trainingData.length;

    if (epoch % 100 === 0) {
        console.log(
            "epoch:",
            epoch,
            "loss:",
            averageLoss
        );
    }

    epoch++;
}


// --------------------
// TRAINED PARAMETERS
// --------------------

console.log("neuron1:", neuron1);
console.log("neuron2:", neuron2);
console.log("neuron3:", neuron3);
console.log("output:", outputNeuron);


// --------------------
// TEST
// --------------------

const hours = 4.5;
const sleep = 7;

const output1 = neuron1Prediction(hours, sleep);
const output2 = neuron2Prediction(hours, sleep);
const output3 = neuron3Prediction(hours, sleep);

const probability =
    outputNeuronPrediction(
        output1,
        output2,
        output3
    );

console.log("probability:", probability);

const prediction =
    probability >= 0.5 ? 1 : 0;

console.log("prediction:", prediction);