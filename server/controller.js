module.exports = {
    getUser: (req, res) => {
        res.status(200).send('this is user data')
    },
    makeUser: (req, res) => {
        res.status(200).send('this is making user data. Leaving soon')
    },
    updateUser: (req, res) => {
        res.status(200).send('this is updating user data')
    },
    deleteUser: (req, res) => {
        res.status(200).send('what the f*** why are you deleting?')
    },
    getScores: (req, res) => {
        res.status(200).send('here, have a score')
    },
    addScore: (req, res) => {
        res.status(200).send(`so, you didn't lose...`)
    },
    updateScore: (req, res) => {
        res.status(200).send('are we really changing this?')
    },
    deleteScore: (req, res) => {
        res.status(200).send('that is it, no score for you')
    },
    getAssets: (req, res) => {
        res.status(200).send('have some stuff')
    }

}