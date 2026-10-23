// we mix both neural network and reinforcement learning
// but instead of using qTable, we use neural network for qValues
// how do we do that??
// initially we will be having random weights and bias
// don't worry about math formulas etc, because in future we are going to use pytorch for that
// so this will be the flow
// lets say

// Q((4,4)): current state
// these are the values our model predicts using random iniitial weights and bias
// DOWN   = 3.1
// RIGHT  = 4.6   ← this is the prediction we're updating
// LEFT   = 3.0
// UP     = 1.8

// so predicted Q = 4.6

// now we look at the next state (4,5), (assuming this)

// and ask the network  Q(4,5)
// may be it gives
// DOWN   = 4.5
// RIGHT  = 6.2  ← highest
// LEFT   = 3.1
// UP     = 4.6
// so futurebestvalue -> futureBestQ = 6.2
// bellman gives -> target = reward + γ × futureBestQ
// supposing (reward = -1  γ = 0.9 futureBestQ = 6.2) so ->  target = -1 + (0.9 × 6.2) = 4.58

// finally we get prediction and target, we can find loss**2 now
// predicted Q = 4.6
// target Q    = 4.58

// as we have found it, now we are going to use this to find loss ** 2, and using that loss to find new weight and bias


// so instead of supervised learning which was
// dataset -> (input, correct_answer) => neural_network

// and reinforcement
// environment -> agent interacts -> (state, action, reward, next_state) -> calculate target -> neural network training (by updating weight and biases) 


// if i say simply, we are just simply finding values for gradient and bias that fits every state so actually we are just finding average


// one thing to say, 
// network decides action
// action decides reward and next state
// action is defined in environment like a function (for example to play the maze game -> move function)
// so it will be like environment decides reward and nextState using currentstate and action taken
// and action is decided by network (for our case, neural network and reinforcement learning by using max(...qvalues))
