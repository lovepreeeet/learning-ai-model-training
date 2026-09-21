// let LEARNING_RATE = 0.000000001;
const LEARNING_RATE = 0.01
// let actualValue = 60;
// let hours = 4;

// const trainingData = [
//     { hours: 1, score: 30 },
//     { hours: 2, score: 40 },
//     { hours: 3, score: 50 },
//     { hours: 4, score: 60 },
//     { hours: 5, score: 70 },
// ];
const trainingData = [
    { hours: 1, score: 32 },
    { hours: 2, score: 39 },
    { hours: 3, score: 53 },
    { hours: 4, score: 57 },
    { hours: 5, score: 72 },
];



// const trainingData = [
//     { hours: 500, score: 20 },
//     { hours: 700, score: 28 },
//     { hours: 900, score: 35 },
//     { hours: 1100, score: 43 },
//     { hours: 1300, score: 49 },
// ];


function predict(x, weight, bias) {
    return (weight * x) + bias;
}

function calculateLoss(actual, prediction) {
    return (actual - prediction) ** 2
}

function calculateWeightGradient(x, actual, prediction) {
    return -2 * x * (actual - prediction);
}

function calculateBiasGradient(actual, prediction) {
    return -2 * (actual - prediction)
}

function calculateWeight(weight, gradient) {
    return weight - (LEARNING_RATE * gradient);
}

function calculateBias(bias, gradient) {
    return bias - (LEARNING_RATE * gradient);
}

function trainExamples(examples, weight = 0, bias = 0) {
    let loss = [];
    examples.forEach(({ hours, score: actual }) => {
        let prediction = predict(hours, weight, bias);
        loss.push(calculateLoss(actual, prediction));
        let weightGradient = calculateWeightGradient(hours, actual, prediction);
        weight = calculateWeight(weight, weightGradient);

        let biasGradient = calculateBiasGradient(actual, prediction);
        bias = calculateBias(bias, biasGradient);
    });
    return [weight, bias, loss.reduce((previousValue, current) => previousValue + current, 0) / loss.length]
}

function train(dataSet) {
    let i = 0;
    let weight = 0;
    let bias = 0;
    let loss;
    while (i < 1000) {
        [weight, bias, loss] = trainExamples(dataSet, weight, bias);
        // if (i % 1000 === 0) {
        //     console.log('loss: ', loss);
        // }
        i++;
    }
    console.log(loss);
    return [weight, bias];
}

let [finalWeight, finalBias] = train(trainingData);
// console.log('finalWeight, finalBias: ', finalWeight, finalBias);
console.log(Math.round(predict(2, finalWeight, finalBias)))