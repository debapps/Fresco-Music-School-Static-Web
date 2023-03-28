var expect = require("chai").expect;
var request = require("request");
const cheerio = require("cheerio");
const { assert } = require("chai");

describe("HTML Page Tests ", function () {
  it("Home page contents", function (done) {
    request(
      "http://localhost:8000/index.html",
      function (error, reponse, body) {
        if (error) return console.log(error);

        let $ = cheerio.load(body);
        let title = $("title");
        expect(title.text()).to.equal("Rock School");

        let link = $("link");
        var link_href = link.attr("href");
        var link_type = link.attr("type");
        expect(link_href).to.equal("style.css");
        expect(link_type).to.equal("text/css");

        var list = [];
        var classlist = [];
        $("header")
          .find("nav > a")
          .each(function (index, element) {
            list.push($(element).attr("href"));
            classlist.push($(element).attr("class"));
          });

        actualclass = ["active", undefined, undefined, undefined, undefined];
        actual = ["index.html", "classes.html", "invite.html", "#", "#"];
        expect(list).to.eql(actual);
        expect(classlist).to.eql(actualclass);

        var footer = $("footer");
        expect(footer.text()).to.include(
          "Copyright © 2020 All Rights Reserved"
        );

        var div = $("div");
        expect(div.length).to.be.gt(6);

        var firstdiv = $("div[class=bgimg-1]");
        assert(firstdiv);
        expect(firstdiv.find("div > span").text()).to.equal(
          "WELCOME TO MUSIC SCHOOL"
        );

        var secdiv = $("div[class=bgimg-2]");
        assert(secdiv);
        expect(secdiv.find("div > span").text()).to.equal(
          "ENJOY YOUR MUSIC LEARNING"
        );
        expect(secdiv.find("div > span").attr("style")).to.include(
          "background-color:transparent;"
        );

        var thirddiv = $("div[class=bgimg-3]");
        assert(thirddiv);
        expect(thirddiv.find("div > span").text()).to.equal("THANK YOU");
        expect(thirddiv.find("div > span").attr("style")).to.include(
          "background-color:transparent;"
        );

        var h1 = $("div").find("h1");
        expect(h1.text()).to.equal(
          "Music  gives a soul to the universe,  wings to the mind, flight to the imagination and life to everything."
        );

        var h2 = $("div").find("h2");
        expect(h2.text()).to.equal(
          "My music fights against the system that teaches to live and die."
        );

        var h3 = $("div").find("h3");
        expect(h3.text()).to.include("Words By Plato");
        expect(h3.text()).to.include("Words By Bob Marley");

        var image1 = $("div[class=bgimg-1]").css("background-image");
        var image2 = $("div[class=bgimg-2]").css("background-image");
        var image3 = $("div[class=bgimg-3]").css("background-image");
        expect(image1).to.include(
          "https://image.freepik.com/free-photo/black-electric-guitar-black-cement-floor_34515-569.jpg"
        );
        expect(image2).to.include(
          "https://image.freepik.com/free-photo/acoustic-guitar-playing_1426-615.jpg"
        );
        expect(image3).to.include(
          "https://image.freepik.com/free-photo/mid-section-female-student-playing-guitar_107420-64917.jpg"
        );

        done();
      }
    );
  });

  it("Classes page contents", function (done) {
    request(
      "http://localhost:8000/classes.html",
      function (error, reponse, body) {
        if (error) return console.log(error);

        let $ = cheerio.load(body);
        let title = $("title");
        expect(title.text()).to.equal("Classes");

        var list = [];
        var typelist = [];
        $("link").each(function (index, element) {
          list.push($(element).attr("href"));
          typelist.push($(element).attr("type"));
        });

        actualtype = ["text/css", "text/css"];
        actualsheets = ["style.css", "classes.css"];
        expect(list).to.eql(actualsheets);
        expect(typelist).to.eql(actualtype);

        var list = [];
        var classlist = [];
        $("header")
          .find("nav > a")
          .each(function (index, element) {
            list.push($(element).attr("href"));
            classlist.push($(element).attr("class"));
          });

        actualclass = [undefined, "active", undefined, undefined, undefined];
        actual = ["index.html", "classes.html", "invite.html", "#", "#"];
        expect(list).to.eql(actual);
        expect(classlist).to.eql(actualclass);

        var footer = $("footer");
        expect(footer.text()).to.include(
          "Copyright © 2020 All Rights Reserved"
        );

        var imagelist = [];
        var headinglist = [];
        $("div[class=card]")
          .find("img")
          .each(function (index, element) {
            imagelist.push($(element).attr("src"));
          });

        $("div[class=card]")
          .find("h3")
          .each(function (index, element) {
            headinglist.push($(element).text());
          });

        actualtext = [
          "Violin Classes",
          "Guitar Classes",
          "Piano Classes",
          "Drums Classes",
        ];

        actualimage = [
          "https://image.freepik.com/free-photo/violin-bow-white-background_1150-8456.jpg",
          "https://image.freepik.com/free-photo/acoustic-guitar-chair-close-up-brown-guitar-black-wall_1150-21884.jpg",
          "https://image.freepik.com/free-vector/hand-drawn-sketch-piano-monochrome_93150-632.jpg",
          "https://image.freepik.com/free-vector/black-white-drums-drawing_3442-466.jpg",
        ];

        expect(imagelist).to.eql(actualimage);
        expect(headinglist).to.eql(actualtext);

        var row_div = $("div[class=row]");
        expect(row_div.length).to.equal(2);

        done();
      }
    );
  });

  it("Invite page contents", function (done) {
    request(
      "http://localhost:8000/invite.html",
      function (error, reponse, body) {
        if (error) return console.log(error);

        let $ = cheerio.load(body);
        let title = $("title");
        expect(title.text()).to.equal("Invite");

        var list = [];
        var typelist = [];
        $("link").each(function (index, element) {
          list.push($(element).attr("href"));
          typelist.push($(element).attr("type"));
        });

        actualtype = [undefined, "text/css", "text/css"];
        actualsheets = [
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
          "style.css",
          "invite.css",
        ];
        expect(list).to.eql(actualsheets);
        expect(typelist).to.eql(actualtype);

        var list = [];
        var classlist = [];
        $("header")
          .find("nav > a")
          .each(function (index, element) {
            list.push($(element).attr("href"));
            classlist.push($(element).attr("class"));
          });

        actualclass = [undefined, undefined, "active", undefined, undefined];
        actual = ["index.html", "classes.html", "invite.html", "#", "#"];
        expect(list).to.eql(actual);
        expect(classlist).to.eql(actualclass);

        var footer = $("footer");
        expect(footer.text()).to.include(
          "Copyright © 2020 All Rights Reserved"
        );

        var div_bg1 = $("div[class=bgimg-1]").find("span");
        expect(div_bg1.text()).to.include(
          "Pick your favourite social media platform"
        );

        var div_a = $("div[class=bgimg-1]").find("a");
        expect(div_a.length).to.equal(19);

        var list = [];
        $("div[class=bgimg-1]")
          .find("a")
          .each(function (index, element) {
            list.push($(element).attr("class"));
          });

        actual_class = [
          "fa fa-facebook",
          "fa fa-twitter",
          "fa fa-google",
          "fa fa-linkedin",
          "fa fa-youtube",
          "fa fa-instagram",
          "fa fa-pinterest",
          "fa fa-snapchat-ghost",
          "fa fa-skype",
          "fa fa-dribbble",
          "fa fa-vimeo",
          "fa fa-tumblr",
          "fa fa-vine",
          "fa fa-foursquare",
          "fa fa-stumbleupon",
          "fa fa-flickr",
          "fa fa-yahoo",
          "fa fa-reddit",
          "fa fa-rss",
        ];
        expect(list).to.eql(actual_class);
        done();
      }
    );
  });
});
