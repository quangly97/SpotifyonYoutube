# Spotify on Youtube

Plays music or lyric videos from songs on your Spotify so you can watch while you listen!
Done in React.js and Node.js
Currently Hosted on https://kojoplay.herokuapp.com/

## Tutorial

Upon clicking the app you will see a login page. Click "Login with "Spotify": 

<img src="https://github.com/KojoObeng/SpotifyonYoutube/blob/master/images/front_page.JPG">

Sign into your Spotify Account: 

<img src="https://github.com/KojoObeng/SpotifyonYoutube/blob/master/images/authorization_page.JPG" align="middle" width="300">

There are 2 modes. 1. Dynamic and 2. Playlist

<img src="https://github.com/KojoObeng/SpotifyonYoutube/blob/master/images/modes.jpg" align="middle" width="700">


### Dynamic

Dynamic mode allows you to control the Youtube player through Spotify app.

<img src="https://github.com/KojoObeng/SpotifyonYoutube/blob/master/images/dynamic.jpg" align="middle" width="700">

Wait up to 5 seconds for the first video to load. Do not go back.

Once the first video is loaded, you can control the player by playing a new song on the Spotify app. Wait up to 5 seconds to allow it to change.

Pressing shuffle while a song is playing on the app, will pause the video player. Unpressing shuffle will do the opposite.  Wait up to 2 seconds to allow it to pause/unpause.

Pressing the "repeat (context)" (the image of the loop without the number "1" on it") button on your Spotify app will toggle lyric videos/music videos if there is a lyric video available.


### Playlist

Playlist mode plays a queue of videos of a shuffled playlist of your choice.

<img src="https://github.com/KojoObeng/SpotifyonYoutube/blob/master/images/pick_playlist_page.JPG" align="middle" width="900" height="230">

Pick a playlist.

Wait for the first few songs to load. Do not go back.

<img src="https://github.com/KojoObeng/SpotifyonYoutube/blob/master/images/loading.jpg" align="middle" width="700">

You can choose the song that plays in the player, by clicking on the buttons on top.

To load more songs to play, click the "Load more (x)" buttons on the side and wait.






## To work on/Discussion:

1. The use of node.js for computationally heavy tasks is limiting the concurrency ability for the project, heavily.
We will aim to reduce the time of computation for each thread by removing the use of xPath selectors, running a Puppetteer cluster to maximize use of cores, and use a Heroku cluster.

2. Refreshing access token is not easily accessible. Need to go back to the login page to do it. Will add a button for this.


3. Fix the typed.js animation from moving the YouTube window in the 'Playlist' mode.









