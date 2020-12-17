$(document).ready(function () {   // if using modal, need to load the document
    M.AutoInit();
    var listIndex = JSON.parse(localStorage.getItem("index"));
    var userList = JSON.parse(localStorage.getItem("playlistsList"));
    var activePlaylist = userList[listIndex];
    var songList = activePlaylist['songs'] || [];


    /* initialize modal for the page */
    //$('.modal').modal();   // if we use the modal

    // Replace Playlist Name with active playlist
    $(".playlist-title").text(activePlaylist['playlistName'])

    function calls(title, artist) {
        var queryURL = `https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=${artist}&t=${title}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            if (response.track !== null) {
                var tadbResponse = response;
                title = fixCaps(title);
                artist = fixCaps(artist);
                queryURL = `https://api.lyrics.ovh/v1/${artist}/${title}`;
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    displayResults(tadbResponse, title, artist, response.lyrics)
                })
            } else {
                M.toast({ html: `Artist not found.<br>Check your spelling or pick another artist.`, classes: 'rounded' })

            }
        });
    }

    function displayResults(response, title, artist, lyrics) {
        // Get data from response
        var song = response.track[0];

        var thumb = song.strTrackThumb;
        if (thumb === null) {
            thumb = "assets/images/missing-thumbnail.png"
        }

        var youtubeLink = song.strMusicVid;
        if (youtubeLink === null) {
            var searchTitle = searchString(title);
            var searchArtist = searchString(artist);
            var query = searchTitle + "+" + searchArtist;
            youtubeLink = `https://www.youtube.com/results?search_query=${query}`;
        }

        // Append
        var resultsList = $("#results"); // parent

        var result = $(`<div class="result row">`);
        var flex = $(`<div class="flex-container">`);
        var image = $(`<div><img class="image playlistview-tmbnail" src=${thumb}></div>`);
        var songData = $(`<div class="details"><h4 class="Songtitle">${title}</h4><p class="songinfo">Artist: ${artist}</p><p class="songinfo">Album: ${song.strAlbum}</p><a class="songinfo" href= ${youtubeLink} target='_blank'>Watch on YouTube</a></div>`);
        var addDiv = $(`<div class="position-right"></div>`);

        // Add to playlist Button
        var addButton = $(`<a class="btn-floating btn-large waves-effect waves-light add-to-playlist"><i class="material-icons">add</i></a>`).click(function (event) {
            var songData = {                    // create an object with all data
                title: title,
                artist: artist,
                album: song.strAlbum,
                thumbnail: thumb,
                link: youtubeLink,
                lyrics: lyrics
            };

            songList.push(songData);  // push song object into array of songs 
            activePlaylist['songs'] = songList; // add array to active playlist
            userList[listIndex] = activePlaylist; // Replace active playlist into array of playlists
            localStorage.setItem("playlistsList", JSON.stringify(userList)); // store  
            M.toast({ html: `Song added`, classes: 'rounded' })
        })

        var collapsible = $(`<ul class="collapsible space">`);
        var li = $(`<li>`);
        var collapsibleHeader = $(`<div class="collapsible-header"><i class="material-icons">queue_music</i>View Lyrics</div>`);
        var collapsibleBody = $(`<div class="collapsible-body"><pre>${lyrics}</pre></div>`);

        li.append(collapsibleHeader);
        li.append(collapsibleBody);
        collapsible.append(li);
        flex.append(image);
        flex.append(songData);
        addDiv.append(addButton);
        flex.append(addDiv);
        result.append(flex);
        result.append(collapsible);
        resultsList.append(result);
        M.AutoInit();
    }

    // Returns string with first letter of each word capitalized
    function fixCaps(string) {
        string = string.toLowerCase();
        string = string.charAt(0).toUpperCase() + string.substr(1, string.length);
        for (let i = 0; i < string.length; i++) {
            if (string.charAt(i) === " ") {
                var char = string.charAt(i + 1);
                string = string.substr(0, i + 1) + char.toUpperCase() + string.substr(i + 2, string.length);
            }
        }
        return string;
    }

    // Returns lowercase string with + instead of spaces
    function searchString(string) {
        string = string.toLowerCase();
        string = string.trim();
        string = string.replaceAll(" ", "+");
        console.log(string);
        return string;
    }

    // Event listener - Submit API call
    $("form").submit(function (event) {
        event.preventDefault();
        var title = $(".title")[0].value;
        var artist = $(".artist")[0].value;
        calls(title, artist);
    })

    // Event listener - Go to playlist
    $(".playlist-link").click(function () {
        window.location = "playlistview.html";
    });

    // Event listener - Clear all results
    $("#clear-results").click(function () {
        $("#results").empty();
    })
