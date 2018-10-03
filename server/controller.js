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
        const db = req.app.get('db')

        db.get_scores()
        .then(scores => {
            res.status(200).send(scores)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! Slomething went wrong, could not get scores. Better luck next time!"})
            console.log(err)
        })
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