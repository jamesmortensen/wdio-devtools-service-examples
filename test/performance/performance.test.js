let { expect } = require('chai');
const reporter = require('@wdio/allure-reporter').default;

let metrics, score

describe('My Performance Test', () => {
    before(() => {
        // login stuff
        browser.enablePerformanceAudits()
        browser.url('https://magnificent-cabbage.glitch.me');
        metrics = browser.getMetrics()
        score = browser.getPerformanceScore()
    })

    it('should not increase firstMeaningfulPaint limit', () => {
        expect(metrics.firstMeaningfulPaint).to.be.below(3 * 1000) // 3 seconds
    })

    it('should not increase firstInteractive limi', function () {
        expect(metrics.firstInteractive).to.be.below(3 * 1000) // 3 seconds
    })

    it('should not increase speedIndex limit', () => {
        expect(metrics.speedIndex).to.be.below(4.2 * 1000)
    })

    it('should have a minimum Lighthouse performance score', () => {
        expect(score).to.be.above(0.92)
    })
})
