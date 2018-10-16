const unitFunctions = require('../functions/unitFunctions')
describe('validateInputLength Function', () => {
    test('validate data type', () => {
        let response = unitFunctions.validateInputLength('bombboy')

        expect(typeof response).toBe('string')
    })
    test('validate data type if not string', () => {
        let response = unitFunctions.validateInputLength(123)

        expect(typeof response).toBe('number')
    })
    test('test input Length is > than 40', () => {
        let response = unitFunctions.validateInputLength('bombboy')

        expect(response.length>40).toBe(false)
    })
    test('test input length is < 40', () => {
        let response = unitFunctions.validateInputLength('bombboy')

        expect(response.length<40).toBe(true)
    })
    test('test input length of over 40 char string is only 40', () => {
        let response = unitFunctions.validateInputLength('ajajajajajajajajajajajajajajajajajajajaja')

        expect(response.length===40).toBe(true)
    })
    test('test input of over 40 char string to be the same', () => {
        let response = unitFunctions.validateInputLength('ajajajajajajajajajajajajajajajajajajajaja')

        expect(response).toBe('ajajajajajajajajajajajajajajajajajajajaj')
    })
    test('test input to make sure it is not manipulated on < 40 char string', () => {
        let response = unitFunctions.validateInputLength('stank')

        expect(response).toBe('stank')
    })
    test('test input to make sure it is not manipulated on < 40 char string and numbers included', () => {
        let response = unitFunctions.validateInputLength('5tank')

        expect(response).toBe('5tank')
    })
})

describe('timeScoreAlg tests', () => {
    test('test data type is number', () => {
        let timeScore = unitFunctions.timeScoreAlg(45000)

        expect(typeof timeScore).toBe('number')
    })
    test('test score to be > 0', () => {
        let timeScore = unitFunctions.timeScoreAlg(45000)

        expect(timeScore>0).toBe(true)
    })
    test('test score to be < 12500', () => {
        let timeScore = unitFunctions.timeScoreAlg(75000)

        expect(timeScore<12500).toBe(true)
    })
    test('test score to be = 0', () => {
        let timeScore = unitFunctions.timeScoreAlg(90000)

        expect(timeScore).toBe(0)
    })
    test('test score to be = 12500', () => {
        let timeScore = unitFunctions.timeScoreAlg(45000)

        expect(timeScore).toBe(12500)
    })
    test('test score to be = 12500', () => {
        let timeScore = unitFunctions.timeScoreAlg(45000)

        expect(timeScore).not.toBeFalsy
    })
    test('test score to be = 12500', () => {
        let timeScore = unitFunctions.timeScoreAlg(45000)

        expect(timeScore).toBeTruthy()
    })
})