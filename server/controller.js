module.exports = {
    getUser: (req, res) => {
        res.status(200).send('this is user data')
    },
    updateUsername: async (req, res) => {
        const {username} = req.body
        const {user_id, icon} = req.session.user

        let updatedUser = res.get('db').update_username([username, icon, user_id])

        req.session.user = updatedUser
        res.status(200).send(req.session.user)
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