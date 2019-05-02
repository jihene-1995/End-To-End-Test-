// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
var HtmlReporter = require('protractor-beautiful-reporter');
exports.config = {
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--disable-gpu', '--no-sandbox', '--disable-extensions', '--disable-dev-shm-usage','--headless']
    }
  },
  directConnect: true,
  baseUrl: 'https://testing-angular-applications.github.io',
  
  framework: 'jasmine2',
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
   onPrepare: function () {
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter());
    jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
    jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: 'tmp/screenshots'
      }).getJasmine2Reporter());
  },
  useAllAngular2AppRoots: true
};
