callADB = function(title,artist) {
    var queryURL = `https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=${artist}&t=${title}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        if(response.track !== null) {
            displayResults(response,title,artist);
        } else {
            // Modal error: can't find track

        }
    });
}

displayResults = function(response,title,artist) {
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
    var youtubeLink = $(`<a href=${song.strMusicVid} target='_blank'>Watch on YouTube</a>`);
    var addButton = $(`<button class='add-to-playlist'>Add to Playlist</button>`);
    var removeResultButton = $(`<button class='remove-result'>Remove Result</button>`);
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