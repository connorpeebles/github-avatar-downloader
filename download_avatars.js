var request = require("request");
var fs = require("fs");
var secrets = require("./secrets");

var args = process.argv;

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": "token " + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {

    if (err) {
      console.log("The following error occurred: ", err)
      throw err;
    }

    var obj = JSON.parse(body);
    cb(err, obj);
  });

}

function downloadImageByURL(url, filePath) {

  request.get(url)
         .on("error", function(err) {
           throw err;
         })
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(args[2], args[3], function(err, result) {

  if (args.length < 4) {
    console.log("Error: please indicate the repoOwner and repoName")
    return;
  }

  if (err) {
    console.log("The following error occurred: ", err)
    throw err;
  }

  for (var obj of result) {
    var filePath = "avatars/" + obj.login;
    var url = obj.avatar_url;
    downloadImageByURL(url, filePath);
  }
});



// downloadImageByURL("https://sytantris.github.io/http-examples/future.jpg", "./future.jpg");