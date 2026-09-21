let LEARNING_RATE = 0.01;
// let actualValue = 60;
// let hours = 4;

const trainingData = [
    { hours: 1, score: 30 },
    { hours: 2, score: 40 },
    { hours: 3, score: 50 },
    { hours: 4, score: 60 },
    { hours: 5, score: 70 },
];


function predict(x, weight, bias) {
    return (weight * x) + bias;
}

function calculateLoss(actual, prediction) {
    return (actual - prediction) ** 2
}

function calculateGradient(x, actual, prediction) {
    return -2 * x * (actual - prediction);
}

function calculateWeight(weight, gradient) {
    return weight - (LEARNING_RATE * gradient);
}

function trainExamples(examples, weight = 0, bias = 0) {
    examples.forEach(({ hours, score: actual }) => {
        let prediction = predict(hours, weight, bias);
        let loss = calculateLoss(actual, prediction);
        let gradient = calculateGradient(hours, actual, prediction);
        weight = calculateWeight(weight, gradient);
    });
    return weight;
}

function train(dataSet) {
    let i = 0;
    let weight = 0;
    while (i < 10) {
        weight = trainExamples(dataSet, weight);
        console.log('weight: ', weight);
        i++;
    }
    // console.log('weight: ', weight);
    return weight;
}

let finalWeight = train(trainingData);
// console.log(predict(1, finalWeight, 0))