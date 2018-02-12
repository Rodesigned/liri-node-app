//Create the dotenv file to store and hide keys
require("dotenv").config();

//Create variables to require, request and import API's into the keys.js file and store it in them in the variables.
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var client = new twitter(keys.twitter);
var spotify = require("node-spotify-api");
var newKeys = new spotify(keys.spotify);
// Stores all of the arguments in an array
var liriCommand = process.argv[2];


//Switch-case statement to direct which function to run
function doThis(command, arg) {
    switch (command) {

        case "my-tweets":
            myTweets(arg);
            break;

        case "spotify-this-song":
            spotifyThisSong(arg);
            break;

        case "movie-this":
            movieThis(arg);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;

        default:
            console.log(
                "\nType any one of these command lines after 'node liri.js': " + "\n" + "1. my-tweets 'any twitter name' " + "\n" + "2. spotify-this-song 'any song name' " + "\n" + "3. movie-this 'any movie title' " + "\n" + "4. do-what-it-says" + "\n" + "Be sure to include all song names and movie titles in quotations if it is more than one word. ");
    }
}

//If the myTweets function is called
function myTweets(arg) {
    //variable that holds argument
    var myTweets = arg;
    var params = { screen_name: '@techsita', count: 20 };

    //Create method to get info from Twitter
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("My tweets!");
            // Create for loop to get each tweet and the dates they were created
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                // Log the top 20 tweets and the dates they were created
                console.log("@techsita: " + tweets[i].text + " ---" + " Date Tweeted: " + date.substring(0, 19));
                console.log("-----------------------");
            }
        } else {
            //log error message if error occurs and show error
            console.log("Error :" + error);
            return;
        }
    });
}

//If the spotify-this-song function is called
function spotifyThisSong(arg) {
    //variable that holds argument
    var songName = arg;
    if (!songName) {
        songName = "The Sign by Ace of Base";
        console.log(songName);
    }
    var params = songName;
    //Use method to Spotify the song name entered by user
    newKeys.search({ type: 'track', query: params }, function(error, data) {
        if (!error) {
            var songInfo = data.tracks.items[0];
            var spotifyResults =
                "User Input: " + songName + "\n" +
                "Artist: " + songInfo.artists[0].name + "\n" +
                "Song: " + songInfo.name + "\n" +
                "Album Song is from: " + songInfo.album.name + "\n" +
                "Preview Url: " + songInfo.preview_url + "\n";
            console.log(spotifyResults);
        } else {
            //log error message if error occurs and show error
            console.log("Error :" + error);
            return;
        }

    });
    console.log("Spotify This Song!");
}

//If the movie-this function is called
function movieThis(arg) {
    //Createv a variable to the movie data + arguments
    var movieName = arg;
    if (!movieName) {
        movieName = "Mr. Nobody";
        console.log("Default Movie: " + movieName);
    }

    params = movieName;

    //Use omdb url and Run the request module to receive the JSON properties and values
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        //If there are no errors the response code will be 200 indicating that the request was successful.
        if (!error && response.statusCode === 200) {
            var movieObject = JSON.parse(body);
            var movieResults =
                "Title: " + movieObject.Title + "\n" +
                "Release Year: " + movieObject.Year + "\n" +
                "IMDB Rating: " + movieObject.imdbRating + " out of 10" + "\n" +
                "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\n" +
                "Country Movie was produced in: " + movieObject.Country + "\n" +
                "Plot: " + movieObject.Plot + "\n" +
                "Actors: " + movieObject.Actors + "\n";
            console.log(movieResults);
        } else {
            //log error message if error occurs and show error
            console.log('Error occurred.');
            return;
        }
    });
    console.log("-----------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
    console.log("Movie This!");
}

//If the do-what-it-says function is called
//Retrieve the txt file with the file system command
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (!error) {
            var fileCommands = data.split(",");
            console.log(fileCommands);
            doThis(fileCommands[0], fileCommands[1]);

        } else {
            //log error message if error occurs and show error
            console.log('Error occurred.');
            return;
        }

    });
    console.log("Do What It Says!");
}

doThis(process.argv[2], process.argv[3]);