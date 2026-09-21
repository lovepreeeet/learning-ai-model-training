const LEARNING_RATE = 0.01

const trainingData = [
    { hours: 2, sleep: 8, score: 45 },
    { hours: 4, sleep: 8, score: 60 },
    { hours: 6, sleep: 8, score: 75 },
    { hours: 2, sleep: 5, score: 40 },
    { hours: 6, sleep: 5, score: 70 },
];

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
    while (i < 1000) {
        [weight, bias, loss] = trainExamples(dataSet, weight, bias);
        i++;
    }
    console.log(loss);
    return [weight, bias];
}

let [finalWeight, finalBias] = train(trainingData);
// console.log('finalWeight, finalBias: ', finalWeight, finalBias);
console.log(Math.round(predict(2, finalWeight, finalBias)))