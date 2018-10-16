module.exports = {

    validateInputLength: (userInput) => {
        return userInput.length > 40 ? userInput.substring(0,40) : userInput;
    },

    timeScoreAlg: (finalTime) => {
        return ((1 - (finalTime / 90000)) * 25000)
    }
}
