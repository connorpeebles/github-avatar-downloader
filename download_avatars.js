var request = require("request");
var fs = require("fs");
var secrets = require("./secrets");

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var obj = JSON.parse(body);
    cb(err, obj);
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  for (var obj of result) {
    var filePath = "avatars/" + obj.login;
    var url = obj.avatar_url;
    console.log("filepath: ", filePath)
    console.log("url: ", url)
    downloadImageByURL(url, filePath);
  }
});

function downloadImageByURL(url, filePath) {

  request.get(url)
         .on("error", function(err) {
           throw err;
         })
         .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL("https://sytantris.github.io/http-examples/future.jpg", "./future.jpg");