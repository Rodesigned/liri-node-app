# liri-node-app

LIRI is a Language Interpretation and Recognition Interface.

 Our LIRI project is created to get your latest tweets from your twitter account, get a song list from Spotify,
get movie information from OMDb. And we are able to choose random actions from a random.txt file.

## NPM Installs and API's needed.
are needed to work on this project
package.json

### Twitter
Objective is to retrieve 20 tweets from your twitter page:
`npm install twitter`

### Request
`npm install request`

### File System
`npm install fs`

### Spotify
Objective is to retrieve a song of your choice and 
default song to "The Sign by Ace of Base":
`npm install spotify`

### OMDb Movie 
`Retrieves JSON object:
`node liri.js movie-this "Mr. Nobody"

#### Use the fs.readFile command
 to read a random.txt file and does what it says:
`node liri.js do-what-it-says`

## BONUS ##
#### Simple Node Logger (used to log commands to a log.txt file)
`npm install simple-node-logger`
