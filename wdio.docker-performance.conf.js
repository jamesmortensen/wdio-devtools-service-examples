// wdio.docker-performance.conf.js

const reporter = require('@wdio/allure-reporter').default;
/*
 This configuration runs in docker, but headfully, meaning not headless.
 You can run this against an already-running container as follows:

 # Custom built image from selenium/standalone-chrome:
 docker run --rm -p 4444:4444 -p 5900:5900 -p 9222:9222 --shm-size 3g local/standalone-chrome-debug-devtools:1.0

 OR

 # Image that runs chromedriver in a container and connects devtools via
 # remote debugging.
 docker run --rm -p 4444:4444 -p 9222:9222 registry.gitlab.com/denkmal/docker-chromedriver chromedriver --port=4444 --whitelisted-ips= --url-base=/wd/hub --verbose

*/

const merge = require('deepmerge');
const config = {};
config.default = require('./wdio.conf.js').config;

console.log('Node version = ' + process.version);

// insert modified configuration inside
config.override = {
    debug: false,
    execArgv: [],
    specs: ['test/performance/**/*.js'
    ],
    baseUrl: 'https://magnificent-cabbage.glitch.me',
    host: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // automationProtocol: 'webdriver',
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [   // first 3 required for devtools metrics
                '--remote-debugging-port=9222',
                '--remote-debugging-host=0.0.0.0',
                '--headless',
                '--disable-setuid-sandbox',
                '--disable-background-networking',
                '--disable-default-apps',
                '--disable-extensions',
                '--disable-gpu',
                '--disable-sync',
                '--disable-translate',
                '--hide-scrollbars',
                '--metrics-recording-only',
                '--mute-audio',
                '--no-first-run',
                '--safebrowsing-disable-auto-update'
            ]
        }
    }],
    sync: true,
    logLevel: 'info',
    services: [['devtools', { 'debuggerAddress': '127.0.0.1:9222' }]],
    beforeTest: function (test, context) {
        const reporter = require('@wdio/allure-reporter').default;
        reporter.addEnvironment('WDIO config filename', process.argv[2]);
        reporter.addEnvironment('Platform', process.platform);
        reporter.addEnvironment('baseUrl', global.browser.config.baseUrl);
        if (global.browser.config.dockerOptions)
            reporter.addEnvironment('Docker image', global.browser.config.dockerOptions.image);
    },
    before: function (capabilities, specs) {

    },
    onComplete: function (exitCode, config, capabilities, results) {

    },
    after: function (result, capabilities, specs) {

    },
};

// overwrite any arrays in default with arrays in override.
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

// have main config file as default but overwrite environment specific information
exports.config = merge(config.default, config.override, { arrayMerge: overwriteMerge, clone: false });
