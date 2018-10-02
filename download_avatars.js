var request = require("request");
var fs = require("fs");
var getRepoContributors = require("./get_repo_contributors");

var args = process.argv;

console.log("Welcome to the Github Avatar Downloader!");

// writes data found at "url" to "filePath"
function downloadImageByURL(url, filePath) {

  request.get(url)
         .on("error", function(err) {
           console.log("An error occurred while attempting to download an image:")
           throw err;
         })
         .pipe(fs.createWriteStream(filePath));
}

// main function call
getRepoContributors(args[2], args[3], function(err, result) {

  // throws error if not enough paramaters given in node
  if (args.length < 4) {
    console.log("Error: Please indicate the repository owner and name (as follows):\nnode download_avatars.js repo_owner repo_name");
    return;
  } else if (args.length > 4) {
    console.log("Note: More arguments given than required. Input should be as follows:\nnode download_avatars.js repo_owner repo_name")
  }

  // throws error if request fails
  if (err) {
    console.log("An error occurred:")
    throw err;
  }

  // creates directory "avatars" in current directory if it does not currently exist
  var dir = "./avatars"
  if (!fs.existsSync(dir)) {
    console.log("Creating directory 'avatars' in current directory.")
    fs.mkdirSync(dir);
  }

  // calls downloadImageBy URL for each contributor to download each avatar to directory "avatars"
  console.log("Downloading images to directory 'avatars'.")
  for (var obj of result) {
    var filePath = "avatars/" + obj.login;
    var url = obj.avatar_url;
    downloadImageByURL(url, filePath);
  }

  console.log("Downloading completed!");
});