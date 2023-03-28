var expect = require("chai").expect;
var request = require("request");
const { assert } = require("chai");

var webdriver = require("selenium-webdriver"),
  chrome = require("selenium-webdriver/chrome");
(By = webdriver.By),
  (until = webdriver.until),
  (options = new chrome.Options());
options.addArguments("headless"); // note: without dashes
options.addArguments("disable-gpu");
var path = require("chromedriver").path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
var driver = new webdriver.Builder()
  .forBrowser("chrome")
  .withCapabilities(webdriver.Capabilities.chrome())
  .setChromeOptions(options) // note this
  .build();

describe("Index Page Styling Tests ", function () {
  driver.get("http://localhost:8000/index.html");
  it("Background-attachment content for first div", function (done) {
    driver
      .findElement(By.className("bgimg-1"))
      .getCssValue("background-attachment")
      .then(function (value) {
        expect(value).to.equal("fixed");
      })
      .then(done());
  });

  it("Background-attachment content for second div", function (done) {
    driver
      .findElement(By.className("bgimg-2"))
      .getCssValue("background-attachment")
      .then(function (value) {
        expect(value).to.equal("fixed");
      })
      .then(done());
  });

  it("Background-attachment content for third div", function (done) {
    driver
      .findElement(By.className("bgimg-3"))
      .getCssValue("background-attachment")
      .then(function (value) {
        expect(value).to.equal("fixed");
      })
      .then(done());
  });

  it("Letter spacing in headings", function (done) {
    driver
      .findElement(By.tagName("h3"))
      .getCssValue("letter-spacing")
      .then(function (value) {
        expect(value).to.equal("5px");
      })
      .then(done());
  });

  it("Background color and text color of active button in navigation bar", function (done) {
    driver
      .findElement(By.className("active"))
      .getCssValue("background-color")
      .then(function (value) {
        expect(value).to.equal("rgba(255, 255, 255, 1)");
      });

    driver
      .findElement(By.className("active"))
      .getCssValue("color")
      .then(function (value) {
        expect(value).to.equal("rgba(0, 0, 0, 1)");
      })
      .then(done());
  });
});
// describe('invite Page Styling Tests ', function(){
//     driver.navigate().to('http://localhost:8000/invite.html')
//     it('Background-attachment content for first div', function(done){
//         driver.findElement(By.className('fa'))
//             .getCssValue('border-radius').then(function(value) {
//             expect(value).to.equal('40');

//         }).then(done());
//     })

// });
