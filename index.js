const LEARNING_RATE = 0.01;
export function calculateLoss(actual, prediction) {
    return (actual - prediction) ** 2
}

export function calculateWeightGradient(x, actual, prediction) {
    return -2 * x * (actual - prediction);
}

export function calculateBiasGradient(actual, prediction) {
    return -2 * (actual - prediction)
}

export function calculateWeight(weight, gradient) {
    return weight - (LEARNING_RATE * gradient);
}

export function calculateBias(bias, gradient) {
    return bias - (LEARNING_RATE * gradient);
}

export function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
