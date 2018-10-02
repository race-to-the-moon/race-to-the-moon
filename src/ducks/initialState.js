module.exports = {   
    rocket: {
        health: 100,
        hit: false,
        time: 180,
        alive: true,
        boost: false,
        boostAmt: 0,
        location: {},
        invincible: false,
        rocket: {
            top: '',
            body: '',
            thruster: ''
        }
    },
    asteroid: [
        {
            location: {},
            hit: false,
            hitByLaser: false
        }
    ],
    laser: {
        location: {}
    },
    score: {
        astScore: 0,
        timeScore: 0
    }
}