# liri-node-app

LIRI is a Language Interpretation and Recognition Interface.

 Our LIRI project is created to get your latest tweets from your twitter account, get a song list from Spotify,
get movie information from OMDb. And we are able to choose random actions from a random.txt file.

## Installs

The package.json
lists dependent node packages, but for your convenvice, these are the ones to install.

### Twitter

`npm install twitter`

### Spotify

`npm install spotify`

### Request

`npm install request`

### FS

`npm install fs`

### Simple Node Logger

`npm install simple-node-logger`

## Get Started

Here's a quick rundom of the commands you can use in LIRI.

### Get Tweets

Retrieves up to your latest 20 tweets:

`node liri.js my-tweets`

### Get Song Info

Retrieves song information for a track:

`node liri.js spotify-this-song "American Girl"`

### Get Movie Info

Retrieves movie information for a movie:

`node liri.js movie-this "Star Wars"`

### Get Random Info

Gets random text inside a file and does what it says:

`node liri.js do-what-it-says`
