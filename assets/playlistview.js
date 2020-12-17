$(document).ready(function () {
    M.AutoInit();
    
    var userChoice = JSON.parse(localStorage.getItem("index"));
    var userList = JSON.parse(localStorage.getItem("playlistsList"));
    var activePlaylist = userList[userChoice];
    var songList = activePlaylist['songs'] || [];
    

    /***************FOR TESTING**********************/
    songList[0] = {
        title: "yellow",
        artist: "coldplay",
        album: "Yellow album",
        thumbnail: "assets/images/missing-thumbnail.png",
        link: "https://www.youtube.com/watch?v=yKNxeF4KMsY&ab_channel=Coldplay",
        lyrics: "Look at the stars"
    };
    songList[1] = {
        title: "Singin' In The Rain",
        artist: "Gene Kelly",
        album: "Singing In The Rain",
        thumbnail: "assets/images/missing-thumbnail.png",
        link: "https://www.youtube.com/watch?v=D1ZYhVpdXbQ&ab_channel=lbarnard86",
        lyrics: "I'm singin' in the rain, Just singin' in the rain..."
    };

    activePlaylist['songs'] = songList;
    /********************************************/


    // Display Title of Active Playlit
    $(".playlist-title").text(activePlaylist['playlistName'])


    /*** Building the song list if any ***/
    function songlistBuild() {
        $(".song-list").empty(); // To avoid repeated elements 
        //   Looping through the array of playlists
        for (let i = 0; i < songList.length; i++) {
            var songEl = $(` <div class="row">`);
            // Adding attributes and children with text
            songEl.attr("data-name", songList[i].title);
            songEl.attr("data-index", i);
            songEl.append(`<div class="flex-container">
            <div><img class="image" src="${songList[i].thumbnail}"></div>
            <div class="details">
                <h4>${songList[i].title}</h4>
                <p>${songList[i].artist}</p>
                <p>${songList[i].album}</p>
                <a href="${songList[i].link}" target="_blank">Watch on YouTube</a>
            </div>
            <div class="position-right">                      
                <a class="btn-floating btn-large waves-effect waves-light" id="remove" data-index="${i}">
                <i class="material-icons">remove</i></a>         
            </div>
            </div>
            <ul class="collapsible"><li>
              <div class="collapsible-header"><i class="material-icons">queue_music</i>View Lyrics</div>
              <div class="collapsible-body"><span>${songList[i].lyrics}</span></div>
            </li></ul></div>`)
            $(".song-list").append(songEl);
            $('.collapsible').collapsible();  // Initialize Materialize collapsible
        };
    };

    songlistBuild();

    // TO DO?  when clicking on a song button, launch the youtube instead of having to click on the blue link?

    // TO DO: up and down arrows to reorder songs?

// We should probably have this on a different page like a manage list page? 
    // Remove 1 playlist at the time
    $(document).on("click", "#remove", function (event) {
        event.stopPropagation();
        let i = $(this).data("index");
        songList.splice(i, 1);
        for (let j = 0; j < songList.length; j++) { songList[j].index = j }
        userList[userChoice].songs = songList;
        localStorage.setItem("playlistsList", JSON.stringify(userList));
        songlistBuild()
    })

})