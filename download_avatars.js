var request = require("request");
var fs = require("fs");
var getRepoContributors = require("./get_repo_contributors");

var args = process.argv;

console.log("Welcome to the Github Avatar Downloader!");

function downloadImageByURL(url, filePath) {

  request.get(url)
         .on("error", function(err) {
           console.log("An error occurred while attempting to download an image:")
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
    console.log("An error occurred:")
    throw err;
  }

  console.log("Downloading images to directory 'avatars'.")
  for (var obj of result) {
    var filePath = "avatars/" + obj.login;
    var url = obj.avatar_url;
    downloadImageByURL(url, filePath);
  }

  console.log("Downloading completed!");
});