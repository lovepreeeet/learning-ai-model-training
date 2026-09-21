let LEARNING_RATE = 0.01;
let actualValue = 60;
let hours = 4;


function predict(x, weight, bias) {
    return (weight * x) + bias;
}

function calculateLoss(actual, prediction) {
    return (actual - prediction) ** 2
}

function calculateWeightGradient(x, actual, prediction) {
    return -2 * x * (actual - prediction);
}

function train(
    hours,
    actualValue,
    weight = 0,
    bias = 0
) {
    let prediction = predict(hours, weight, bias);
    console.log('prediction: ', prediction);
    console.log("   ")

    let i = 0;
    while (i < 5) {
        let loss = calculateLoss(actualValue, prediction);
        console.log('loss: ', loss);

        let gradient = -2 * hours * (actualValue - prediction);
        console.log('gradient: ', gradient);

        weight = weight - (LEARNING_RATE * gradient);
        console.log('weight: ', weight);

        prediction = predict(hours, weight, bias);
        console.log('prediction: ', prediction);
        console.log("   ")
        i++
    }

    return weight
}


let finalWeight = train(hours, actualValue);
console.log('finalWeight: ', finalWeight);
// let prediction = predict(1, finalWeight, 0);
// console.log('prediction: ', prediction);
