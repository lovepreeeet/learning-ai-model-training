// we build the RL training loop without the neural network first.

const ACTIONS = {
    SELL: "SELL",
    BUY: "BUY",
    HOLD: "HOLD",
}
const EPSILON = 0.1;

const calculatePortfolio = ({ cash, stocks, price }) => {
    return cash + (stocks * price);
}

const randomNumberBetween = (min, max, shouldFloor = true) => {
    let output = Math.random() * (max - min + 1)
    return (shouldFloor ? Math.floor(output) : output) + min;
}

const environment = (currentState, action) => {

    const priceChange = randomNumberBetween(-5, 5);
    const newPrice = currentState.price + priceChange;
    const currentPortfolio = calculatePortfolio(currentState);

    let cash = currentState.cash;
    let stocks = currentState.stocks;

    if (action === ACTIONS.BUY) {
        if ((cash - (currentState.price * 1)) > 0) {
            stocks++;
            cash -= (currentState.price * 1);
        }
        const newPortfolio = calculatePortfolio({
            cash,
            stocks,
            price: newPrice,
        })
        const reward = newPortfolio - currentPortfolio

        return {
            nextState: {
                price: newPrice,
                cash,
                stocks,
            },
            reward,
        }
    }

    if (action === ACTIONS.SELL) {
        if (stocks > 0) {
            stocks--;
            cash += (currentState.price * 1);
        }

        const newPortfolio = calculatePortfolio({
            cash,
            stocks,
            price: newPrice,
        })
        const reward = newPortfolio - currentPortfolio

        return {
            nextState: {
                price: newPrice,
                cash,
                stocks,
            },
            reward,
        }
    }

    if (action === ACTIONS.HOLD) {
        const newPortfolio = calculatePortfolio({
            cash,
            stocks,
            price: newPrice,
        })
        const reward = newPortfolio - currentPortfolio

        return {
            nextState: {
                price: newPrice,
                cash,
                stocks,
            },
            reward,
        }
    }
}



const predict = (x1, x2, weight, weight2, bias) => { // x are inputs, weights are weights
    return (weight * x1) + (weight2 * x2) + bias;
}


const calculateLoss = (actual, prediction) => {
    return (actual - prediction) ** 2
}

const calculateWeightGradient = (x, actual, prediction) => {
    return -2 * x * (actual - prediction);
}

const calculateBiasGradient = (actual, prediction) => {
    return -2 * (actual - prediction)
}

const calculateWeight = (weight, gradient) => {
    return weight - (LEARNING_RATE * gradient);
}

const calculateBias = (bias, gradient) => {
    return bias - (LEARNING_RATE * gradient);
}

const chooseAction = (currentState) => {
    let actions = Object.keys(ACTIONS);
    const currentStateActions = {
        BUY: 2.4,
        SELL: 1.2,
        HOLD: 3.7
    };


    if (Math.random() < EPSILON) {
        let chosedAction = actions[randomNumberBetween(0, 2)]
        return {
            action: chosedAction,
            value: currentStateActions[chosedAction]
        }
    }

    let bestActionSoFar = actions[randomNumberBetween(0, 1)];

    let bestSoFar = {
        action: bestActionSoFar,
        value: currentStateActions[bestActionSoFar],
    }

    actions.forEach(key => {
        if (currentStateActions[key] > bestSoFar.value) {
            bestSoFar = {
                action: key,
                value: currentStateActions[key],
            }
        }
    })
    return bestSoFar;
}

let i = 0;


let weight = 0;
let bias = 0;



while (i < 1000) { // episode

    const initialState = {
        price: 100,
        cash: 1000,
        stocks: 0,
    }

    let j = 0;

    while (j < 100) { // step


    }


    i++;
}