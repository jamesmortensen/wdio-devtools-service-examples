## Running Performance Tests

To run performance tests on docker, we have to run Chrome with flags that
specify the debugging port as 9222.

### Running Tests Using Chromedriver Docker container

This image starts a container and runs chromedriver.  

```
$ docker run --rm -p 4444:4444 -p 9222:9222 registry.gitlab.com/denkmal/docker-chromedriver chromedriver --port=4444 --whitelisted-ips= --url-base=/wd/hub --verbose
```

The image replaces the default chrome binary with a script that starts 
chrome using all the flags needed to connect WebdriverIO to the container using the devtools protocol.

Once the container starts, run the tests against the docker Chromedriver binary with the wdio.docker-performance.conf.js script.

```
$ npx wdio wdio.docker-performance.conf.js
```

### Selenium/Standalone-Chrome container

#### With wdio-docker-service

The performance tests can be run using the wdio-docker-service. It is common to run e2e tests with selenium/standalone-chrome (or another Selenium image).

However, the selenium/standalone-chrome images do not have the chrome binary flags in place; and it doesn't seem to recognize chrome arguments in the wdio.conf.js files. Instead, the flags must be passed into the binary from within the container itself.

To run with this image, I created a derivative image on top of selenium/standalone-chrome which copies in the modified chrome binary script with the needed flags, so that when the Selenium Server/Chromedriver starts up Chrome, remote debugging is enabled, and devtools can connect to it remotely.

This also uses the same docker configuration, except the image name is different. So it may be easier to configure than trying to use the Chromedriver image.


**Build the derivative image by running:**

```
$ npm run buildImage
```

Then it can be configured via wdio-docker-service as shown in wdio.docker-service-performance.conf.js, using the image name 'local/standalone-chrome-debug-devtools:1.0'

```
$ npx wdio wdio.docker-service-performance.conf.js
```

#### Without wdio-docker-service

Alternatively, it can be run with the container started manually, using the wdio.docker-performance.conf.js script and the following command to start up the container:

```
$ docker run --rm -p 4444:4444 -p 5900:5900 -p 9222:9222 --shm-size 3g local/standalone-chrome-debug-devtools:1.0
```

```
$ npx wdio wdio.docker-performance.conf.js
```

### Running locally only

To run locally, without docker, just run:

```
$ npx wdio
```


### References

https://github.com/webdriverio/webdriverio/issues/3744#issuecomment-474984818
https://gitlab.com/denkmal/docker-chromedriver/-/blob/master/config/chrome
