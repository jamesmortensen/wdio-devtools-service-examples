let { expect } = require('chai');

let transferred, details

describe('pageWeight', () => {
    before(() => {
        browser.enablePerformanceAudits({
            networkThrottling: 'online',
            cpuThrottling: 0,
            cacheEnabled: false
        })
        browser.url('https://magnificent-cabbage.glitch.me');
        const pageWeight = browser.getPageWeight()
        transferred = pageWeight.transferred
        details = pageWeight.details
    })

    it('should load not more than 950kb', () => {
        expect(transferred).to.be.below(950 * 1000)
    })

    it('images should be compressed', () => {
        expect(details.Image.encoded).to.be.below(200 * 1000)
    })

    it('scripts should be minified', () => {
        expect(details.Script.encoded).to.be.below(250 * 1000)
    })
})
