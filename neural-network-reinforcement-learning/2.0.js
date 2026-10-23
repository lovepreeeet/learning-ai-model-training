// from this onwards, we'll be using stock market example
// states will be [price, shares, cash]
// the environment function will be taking currentstate and action as always
// it will be returning {nextstate, reward}
// the reward is decided as portfolio (cash + (shares * price)) - oldPortfolio;

// creating environment only

const ACTIONS = {
    SELL: "SELL",
    BUY: "BUY",
    HOLD: "HOLD",
}

const initialState = {
    price: 100,
    cash: 1000,
    stocks: 0,
}

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