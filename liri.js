//Create the dotenv file to store and hide keys
require("dotenv").config();

//Create variables to require, request and import API's into the keys.js file and store it in them in the variables.
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// Stores all of the arguments in an array
var liriCommand = process.argv[2];


//Switch-case statement to direct which function to run
switch (liriCommand) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("\nType any one of these command lines after 'node liri.js': " + "\n" +
            "1. my-tweets 'any twitter name' " + "\n" +
            "2. spotify-this-song 'any song name' " + "\n" +
            "3. movie-this 'any movie title' " + "\n" +
            "4. do-what-it-says" + "\n" +
            "Be sure to include all song names and movie titles in quotations if it is more than one word. "
        );

        //If the myTweets function is called
        function myTweets() {
            var params = {
                screen_name: '@techsita'
            };
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
                    //Create an error message if error occurs
                    console.log("Error occurred" + error);
                    return;
                }
            });
        }
	}

//If the spotify-this-song function is called
function spotifyThisSong(songName) {
    var songName = process.argv[3];
    if (!songName) {
        songName = "The Sign by Ace of Base";
        console.log(songName);
    }
    params = songName[0];

   //Use method to Spotify the song name entered by user
    spotify.search({
        type: "track",
        query: songName,
    }, function(error, data) {
        if (!error) {
            var songInfo = data.tracks.items;
            console.log("Loading Spotify.....");
            // Create for loop to go through data items
            for (var i = 0; i < 1; i++) {
                if (songInfo[i] !== undefined) {
                    var spotifyResults =
                        "User Input: " + songName + "\r\n" +
                        "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                        "Song: " + songInfo[i].name + "\r\n" +
                        "Preview Url: " + songInfo[i].preview_url + "\r\n" +
                        "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                        "------------- " + i + " -------------" + "\r\n";
                    console.log(spotifyResults);
                }
            }
        } else {
            //log error message if error occurs and show error
            console.log("Error :" + error);
        }
    });
}

//If the movie-this function is called
function movieThis() {
    //Createv a variable to the movie data + arguments
    var movieName = process.argv[3];
    if (!movieName) {
        movieName = "Mr. Nobody";
        console.log("Default Movie: " + movieName);
    }

    params = movieName;

   //Use omdb url and Run the request module to receive the JSON properties and values
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        //If there are no errors the response code will be 200 indicating that the request was successful
        if (!error && response.statusCode === 200) {
            var movieObject = JSON.parse(body);
            console.log("Loading Movie Details.....");
            var movieResults =
                "\nTitle: " + movieObject.Title + "\n" +
                "\nRelease Year: " + movieObject.Year + "\n" +
                "\nIMDB Rating: " + movieObject.imdbRating + "\n" +
                "\nRotten Tomatoes Rating: " + movieObject.tomatoRating + "\n" +
                "\nCountry Movie was produced in: " + movieObject.Country + "\n" +
                "\nPlot: " + movieObject.Plot + "\n" +
                "\nActors: " + movieObject.Actors + "\n";
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
}


//If the do-what-it-says function is called
//Retrieve the txt file with the file system command
function doWhatItSays() {
    fs.readFile('random.txt', 'utf-8', function(error, data) {
        if (!error) {
            var fileCommands = data.split(',');
            console.log("Reading File..... ");
            console.log(fileCommands);

        } else {
        	//log error message if error occurs and show error
            console.log("An Error has Occured! " + error);
            return;
        }

    });

}