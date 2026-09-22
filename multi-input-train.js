const LEARNING_RATE = 0.01

const trainingData = [
    { hours: 2, sleep: 8, score: 45 },
    { hours: 4, sleep: 8, score: 60 },
    { hours: 6, sleep: 8, score: 75 },
    { hours: 2, sleep: 5, score: 40 },
    { hours: 6, sleep: 5, score: 70 },
];

function predict(hours, sleep, hoursWeight, sleepWeight, bias) {
    return (hours * hoursWeight) + (sleep * sleepWeight) + bias;
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

function trainExamples(examples, hoursWeight = 0, sleepWeight = 0, bias = 0) {
    let loss = [];
    examples.forEach(({ hours, sleep, score: actual }) => {
        let prediction = predict(hours, sleep, hoursWeight, sleepWeight, bias);
        loss.push(calculateLoss(actual, prediction));

        let hoursWeightGradient = calculateWeightGradient(hours, actual, prediction);
        let sleepWeightGradient = calculateWeightGradient(sleep, actual, prediction);
        let biasGradient = calculateBiasGradient(actual, prediction);

        hoursWeight = calculateWeight(hoursWeight, hoursWeightGradient);
        sleepWeight = calculateWeight(sleepWeight, sleepWeightGradient);
        bias = calculateBias(bias, biasGradient);
    });
    return [hoursWeight, sleepWeight, bias, loss.reduce((previousValue, current) => previousValue + current, 0) / loss.length]
}

function train(dataSet) {
    let i = 0;
    let hoursWeight = 0;
    let sleepWeight = 0;
    let bias = 0;
    while (i < 10000) {
        [hoursWeight, sleepWeight, bias, loss] = trainExamples(dataSet, hoursWeight, sleepWeight, bias);
        i++;
    }
    return [hoursWeight, sleepWeight, bias];
}

let [hoursWeightFinal, sleepWeightFinal, finalBias] = train(trainingData);
console.log('hoursWeightFinal, sleepWeightFinal, finalBias: ', hoursWeightFinal, sleepWeightFinal, finalBias);
console.log(Math.round(predict(2, 5, hoursWeightFinal, sleepWeightFinal, finalBias)))