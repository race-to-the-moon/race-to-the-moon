import initialState from './initialState';

// // REDUCER // //
export default (state = initialState, action) => {
    const { type, payload } = action

    if (payload) {
        var { topLvl = '',
            nestedObj = '',
            i = '',
            what = '',
            val = '' } = payload
    }


    let newState = JSON.parse(JSON.stringify(state))

    switch (type) {
        case UPDATE_TOP_LEVEL_OBJ:

            newState[what] = val
            return newState

        case UPDATE_VAL_IN_OBJ:
            // // // //
            const {
                rocket: {
                    totalTime,
                    health,
                    boostAmt,
                    boost,
                    invincible,
                    timeRemaining,
                    hit
                },
                gameOn,
                score: { astScore }
            } = newState;


            
            // // // // Loaded If Statement // // // //

            if (what === 'totalTime' && val != 'string') {

                val = totalTime + (!invincible ? 3000 : 0)

            } else if (what === 'totalTime' && boost) {

                val = totalTime - 5000

            } else if (what === 'timeRemaining' && timeRemaining) {

                let boostTimeRemaining = timeRemaining > 5000 ? timeRemaining - 5000 : 0;
                let countingDown = newState.rocket[what] + 10 * (val === 'countDown' ? (-50) : (!boost ? 300 : 0))
                val = val === 'boost' ? boostTimeRemaining : countingDown

            } else if (what === 'timeRemaining') {

                val = 0

            } else if (what === 'health' && health > 0 && !invincible && !boost && !hit) {
                val = health - 10
            } else if (what === 'health') {
                val = health
            } else if (what === 'astScore') {
                val = (val==='meteor' ? astScore + 1000 : astScore + 100)
            } else if (what === 'boostAmt' && boost === true) {
                val = boostAmt - (boostAmt > 0 ? .25 : 0)
            } else if (what === 'boostAmt' && val !== 0) {
                val = (val==='meteor' ? 100 : boostAmt + (boostAmt < 100 ? 5 : 0))
            }

            newState[topLvl][what] = val
            return newState

        case UPDATE_NESTED_OBJ:

            newState[topLvl][nestedObj][what] = val
            return newState

        case UPDATE_OBJ_IN_ARR:

            newState[topLvl][i][what] = val
            return newState

        case UPDATE_NESTED_OBJ_IN_ARR:

            newState[topLvl][i][nestedObj][what] = val
            return newState

        case RESET_REDUX:
            const {rocket, score, gameOnNew, startTime} = payload;

            newState.rocket = rocket;
            newState.score = score;
            newState.gameOn = gameOnNew;
            newState.startTime = startTime;
            return newState;

        default:
            return state;
    }
}

// // TYPES // //
const UPDATE_TOP_LEVEL_OBJ = 'UPDATE_TOP_LEVEL_OBJ'
const UPDATE_VAL_IN_OBJ = 'UPDATE_VAL_IN_OBJ';
const UPDATE_NESTED_OBJ = 'UPDATE_NESTED_OBJ';
const UPDATE_OBJ_IN_ARR = 'UPDATE_OBJ_IN_ARR';
const UPDATE_NESTED_OBJ_IN_ARR = 'UPDATE_NESTED_OBJ_IN_ARR';
const RESET_REDUX = 'RESET_REDUX';


// // ACTION CREATORS // //
export const updateTopLvlObj = (instructions) => {
    return {
        type: UPDATE_TOP_LEVEL_OBJ,
        payload: instructions
    }
}

export const updateValInObj = (instructions) => {
    return {
        type: UPDATE_VAL_IN_OBJ,
        payload: instructions
    }
}

export const updateNestedObj = (instructions) => {
    return {
        type: UPDATE_NESTED_OBJ,
        payload: instructions
    }
}

export const updateObjInArr = (instructions) => {
    return {
        type: UPDATE_OBJ_IN_ARR,
        payload: instructions
    }
}

export const updateNestedObjInArr = (instructions) => {
    return {
        type: UPDATE_NESTED_OBJ_IN_ARR,
        payload: instructions
    }
}

export const resetRedux = () => {
    return {
        type: RESET_REDUX,
        payload: {
            rocket: initialState.rocket,
            score: initialState.score,
            gameOnNew: initialState.gameOn,
            startTime: initialState.startTime
        }
    }
}