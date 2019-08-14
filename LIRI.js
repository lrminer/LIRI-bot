require('dotenv').config();

const keys = require("./keys.js");
const fs = require('fs');
const axios = require('axios');
const Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

console.log(keys.spotify.id);
console.log(keys.spotify.secret);

// node liri.js spotify-this-song <song name here>

const command = process.argv[2];

//used for spotify
// if no song is provided your program will default to "the Sign by Ace of Base"
let query="";
if (process.argv[3]) {
    for (let i = 3; i < process.argv.length; i++) {
        query += process.argv[i];
        console.log(process.argv[i]);
        console.log('query= ' + query);
    }
}   else {
    console.log("Default: " + query);
    console.log('query= ' + query);

}

switch (command) {
    case 'spotify-this-song':
        spotifySearch();
        break;
    case 'movie-this':
        searchOMDB();
        break;
    case 3:
        doWhatItSays();
        break;
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
    });
}

function searchOMDB() {
    axios.get({})



    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
}

function searchSpotify(song) {

}


function doWhatItSays() {
    fs.readFile('filename', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
    });
}