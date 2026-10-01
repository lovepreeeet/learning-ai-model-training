const LEARNING_RATE = 0.01;

const trainingData = [
    // { hours: 1, result: 0 },
    { hours: 2, result: 0 },
    { hours: 3, result: 0 },
    { hours: 4, result: 1 },
    { hours: 5, result: 1 },
    { hours: 6, result: 1 },
];

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function predict(x, weight, bias) {
    const z = (weight * x) + bias;
    return sigmoid(z);
}

function calculateLoss(actual, prediction) {
    return -(
        actual * Math.log(prediction) +
        (1 - actual) * Math.log(1 - prediction)
    );
}

function calculateWeightGradient(x, actual, prediction) {
    return x * (prediction - actual);
}

function calculateBiasGradient(actual, prediction) {
    return prediction - actual;
}

function calculateWeight(weight, gradient) {
    return weight - (LEARNING_RATE * gradient);
}

function calculateBias(bias, gradient) {
    return bias - (LEARNING_RATE * gradient);
}

function trainExamples(examples, weight = 0, bias = 0) {
    let loss = [];

    examples.forEach(({ hours, result: actual }) => {

        // linear calculation + sigmoid
        let prediction = predict(hours, weight, bias);

        // how wrong was the prediction?
        loss.push(calculateLoss(actual, prediction));

        // calculate gradients
        let weightGradient =
            calculateWeightGradient(hours, actual, prediction);

        let biasGradient =
            calculateBiasGradient(actual, prediction);

        // update weight and bias
        weight = calculateWeight(weight, weightGradient);
        bias = calculateBias(bias, biasGradient);
    });

    return [
        weight,
        bias,
        loss.reduce(
            (previousValue, current) => previousValue + current,
            0
        ) / loss.length
    ];
}

function train(dataSet) {
    let i = 0;

    let weight = 0;
    let bias = 0;
    let loss;

    while (i < 1000) {
        [weight, bias, loss] =
            trainExamples(dataSet, weight, bias);

        i++;
    }

    console.log("final loss:", loss);

    return [weight, bias];
}

let [finalWeight, finalBias] = train(trainingData);

console.log("weight:", finalWeight);
console.log("bias:", finalBias);

const probability = predict(
    3.2,
    finalWeight,
    finalBias
);

console.log("probability:", probability);

const prediction = probability >= 0.5 ? 1 : 0;

console.log("prediction:", prediction);