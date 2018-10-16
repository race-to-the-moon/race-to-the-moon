module.exports = {
    getUser: (req, res) => {
        res.status(200).send('this is user data')
    },
    updateUsername: async (req, res) => {
        const { username } = req.body
        if (req.session.user) {
            var { user_id, icon } = req.session.user
        } else {
            var { user_id, icon } = req.body
        }

        let updatedUser = await req.app.get('db').update_username([username, icon, user_id])

        req.session.user = updatedUser[0]
        res.status(200).send(req.session.user)
    },
    deleteUser: async (req, res) => {
        if (req.session.user) {
            var { user_id } = req.session.user
        } else {
            var { user_id } = req.query;
        }
        // let answer = await req.app.get('db').delete_user([user_id])

        res.status(200).send({words:'what the f*** why are you deleting?'})
    },
    getScores: (req, res) => {
        const db = req.app.get('db')

        db.get_scores()
            .then(scores => {
                res.status(200).send(scores)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Slomething went wrong, could not get scores. Better luck next time!" })
                console.log(err)
            })
    },
    addScore: (req, res) => {
        const { totalTime, astScore } = req.body
        if (req.session.user) {
            var { user_id } = req.session.user;
        } else {
            var { user_id } = req.query;
        }
        console.log(totalTime, astScore, user_id)
        req.app.get('db').add_score([totalTime, astScore, user_id])
            .then(response => {
                res.status(200).send(response[0])
            }).catch(error => {
                console.log(error)
            })
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