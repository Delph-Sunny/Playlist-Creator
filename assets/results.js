function callADB(title,artist) {
    var queryURL = `https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=${artist}&t=${title}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        if(response.track !== null) {
            title = fixCaps(title);
            artist = fixCaps(artist);
            displayResults(response,title,artist);
        } else {
            // Modal error: can't find track

        }
    });
}

function displayResults(response,title,artist) {
    var song = response.track[0];
    console.log(song); // Delete Later

    // Create Elements
    var thumb = song.strTrackThumb;
    if(thumb === null) {
        thumb = "assets/images/missing-thumbnail.png"
    }

    var albumThumbnail = $(`<img src=${thumb}>`);
    var songTitle = $(`<p>Title: ${title}</p>`);
    var songArtist = $(`<p>Artist: ${artist}</p>`);
    var songAlbum = $(`<p>Album: ${song.strAlbum}</p>`);
    var youtubeLink = $(`<a href=${song.strMusicVid} target='_blank'>Watch on YouTube</a>`); // Some links broken, might be able to test for it
    var addButton = $(`<button class='add-to-playlist'>Add to Playlist</button>`); // Needs event listener and id
    var removeResultButton = $(`<button class='remove-result'>Remove Result</button>`); // Needs event listener and id
    var lyrics = $(`<p class='lyrics'>Collapsible Lyrics</p>`);

    // Append Elements
    var resultsDiv = $("#results");
    resultsDiv.append(albumThumbnail);
    resultsDiv.append(songTitle);
    resultsDiv.append(songArtist);
    resultsDiv.append(songAlbum);
    resultsDiv.append(youtubeLink);
    resultsDiv.append(addButton);
    resultsDiv.append(removeResultButton);
    resultsDiv.append(lyrics);
}

function fixCaps(string) {
    string = string.toLowerCase();
    string = string.charAt(0).toUpperCase() + string.substr(1,string.length);
    for(let i=0; i<string.length; i++) {
        if(string.charAt(i) === " ") {
            var char = string.charAt(i+1);
            string = string.substr(0,i+1) + char.toUpperCase() + string.substr(i+2,string.length);
        }
    }
    return string;
}

// Event listener - Submit API call
$("#search-form").submit(function(event){
    event.preventDefault();
    var title = $("#title")[0].value;
    var artist = $("#artist")[0].value;
    callADB(title,artist);
})

// Event listener - Go to playlist
$(".playlist-link").click(function(){
    window.location = "playlistview.html";
});