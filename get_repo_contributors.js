var request = require("request");
var secrets = require("./secrets");

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": "token " + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {

    var obj;

    if (!err) {
      obj = JSON.parse(body);
    }

    cb(err, obj);
  });

}

module.exports = getRepoContributors;