require('dotenv').config();

const keys = require("./keys.js");
const fs = require('fs');
const axios = require('axios');
const Spotify = require('node-spotify-api');
const queryString = require('query-string');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// console.log(keys.spotify.id);
// console.log(keys.spotify.secret);

// node liri.js spotify-this-song <song name here>

let command = process.argv[2];

//used for spotify
// if no song is provided your program will default to "the Sign by Ace of Base"
let query = "";
if (process.argv[3]) {
    for (let i = 3; i < process.argv.length; i++) {
        query += `${process.argv[i]} `;
    }
} else {
    //console.log("Default: " + query);
    //console.log('query= ' + query);

}

switch (command) {
    case 'spotify-this-song':
        if (query === "") {
            query = "the sign ace of base";
            spotifySearch();
        } else {
            spotifySearch();
        }
        break;
    case 'movie-this':
        if (query === "") {
            query = "mr nobody";
            searchOMDB();
        } else {
            searchOMDB();
        }
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
    default:
        console.log("Sorry, I dont understand what you mean. \nWhat would you like me to do?");

}

function spotifySearch() {
    spotify.search({
        type: 'track',
        query: query
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);
        console.log("Is this the song you were asking for?");
    });
}

function searchOMDB() {
    params = {
        t: query
    };

    axios.get('http://www.omdbapi.com/?apikey=trilogy&' + queryString.stringify(params))
        .then(function (response) {
            // console.log(response.data);

            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        });



    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced. 
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
}


function doWhatItSays() {
    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        if (data) {
            //console.log(data);
            var dataArr = data.split(",");
            //console.log(dataArr);
            command = dataArr[0];
            for (let i = 1; i < dataArr.length; i++) {
                query += dataArr[i];
            }
            // console.log("command = " + command);
            // console.log("query = " + query);
            switch (command) {
                case 'spotify-this-song':
                    spotifySearch();
                    break;
            }
        }
    });
}