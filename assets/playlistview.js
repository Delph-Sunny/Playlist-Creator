$(document).ready(function () {
    M.AutoInit();

    var userChoice = JSON.parse(localStorage.getItem("index"));
    var userList = JSON.parse(localStorage.getItem("playlistsList"));
    var activePlaylist = userList[userChoice];
    var songList = activePlaylist['songs'] || [];

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

            var flex = $(`<div class="flex-container"></div>`);
            var image = $(`<div><a class="alink" href="${songList[i].link}" target="_blank"/><img class="image playlistview-tmbnail" src=${songList[i].thumbnail}></a></div>`);
            var details = $(`<div class="detail-txt"><a href="${songList[i].link}" target="_blank"/><h4 class="Songtitle">${songList[i].title}</h4> <p class="songinfo">${songList[i].artist}</p> <p class="songinfo">${songList[i].album}</p></a></div>`);
            var remove = $(`<div class="position-right"> <a class="btn-floating btn-large waves-effect waves-light" id="remove" data-index="${i}"> <i class="material-icons">remove</i></a> </div>`);
            var collapsible = $(`<ul class="collapsible"> <li> <div class="collapsible-header"> <i class="material-icons">queue_music</i>View Lyrics</div> <div class="collapsible-body"><pre>${songList[i].lyrics}</pre></div></li></ul></div>`);

            flex.append(image);
            flex.append(details);
            flex.append(remove);

            songEl.append(flex);
            songEl.append(collapsible);

            $(".song-list").append(songEl);

            $('.collapsible').collapsible();  // Initialize Materialize collapsible
        };
    };

    songlistBuild();

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