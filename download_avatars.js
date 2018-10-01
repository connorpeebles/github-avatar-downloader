var request = require("request");
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
    console.log(obj.avatar_url);
  }
});