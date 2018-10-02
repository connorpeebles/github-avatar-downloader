var dotenv = require("dotenv");
var request = require("request");

function getRepoContributors(repoOwner, repoName, cb) {

  // checks if .env exists, if not throws error
  var tokenFile = dotenv.config();
  if (tokenFile.error) {
    console.log("Error: .env file is missing");
    throw tokenFile.error;
  }

  // checks if TOKEN is in .env, if not throws error
  if (!("TOKEN" in process.env)) {
    console.log("Error: TOKEN key is missing from .env file");
    return;
  }

  // gets token from .env file
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