require("dotenv").config();
var request = require("request");

function getRepoContributors(repoOwner, repoName, cb) {

  var token = process.env.TOKEN;
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": "token " + token
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