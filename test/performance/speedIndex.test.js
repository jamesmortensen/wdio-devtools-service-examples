const assert = require('assert')

describe('App Performance Tests', () => {
    before(() => {
        browser.startTracing();
        //browser.url('http://json.org');
        browser.url('https://magnificent-cabbage.glitch.me');
        browser.endTracing();
    })

    // it('should capture speedIndex', () => {
    //     console.log('speed index =  ' + browser.getSpeedIndex());
    // });

    xit('should write to log file', () => {
        const fs = require('fs');
        fs.writeFileSync('tracelog.json',
            JSON.stringify(browser.getTraceLogs()));
    });

    xit('should get performance metrics', () => {
        var obj = browser.getPerformanceData();
        console.log(obj);
    })

    after(() => {
        // browser.disablePerformanceAudits()
    })
})