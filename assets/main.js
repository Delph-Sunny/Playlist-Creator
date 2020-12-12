$(document).ready(function () {
    var userChoice = JSON.parse(localStorage.getItem("index")) || {};
    var userList = JSON.parse(localStorage.getItem("playlistsList")) || [];

    /***************FOR TESTING**********************/
   /* userList = [
        {
            index: "0",
            playlistName: "My running",
            description: "for Saturday workout"
        },
        {
            index: "1",
            playlistName: "My second playlist",
            description: "for Sunday workout"
        }
        ,
        {
            index: "2",
            playlistName: "My third playlist",
            description: "for week workout"
        }
    ]
    localStorage.setItem('playlistsList', JSON.stringify(userList)); */
    /**********************************************/




    /*** Building the playlist list if any ***/
    function playlistBuild() {
        $("#playlists").empty(); // To avoid repeated elements 
        console.log(userList)
        // Looping through the array of playlists
        for (let i = 0; i < userList.length; i++) {
            var playlistEl = $("<p>");
            // Adding a class, attribute and text
            playlistEl.addClass("playlist-name");
            playlistEl.attr("data-name", userList[i].playlistName);
            playlistEl.attr("data-index", i);
            playlistEl.text(userList[i].playlistName);
            playlistEl.append(`<a class="btn-floating btn-small waves-effect waves-light indigo" id="clear" data-index="${i}">
            <i class="material-icons">clear</i></a>`)
            $("#playlists").append(playlistEl);
            console.log(`$(playlistEl)`)
        };
    };

    playlistBuild();

    // when clicking on a playlist button
    $(document).on("click", ".playlist-name", function (event) {
        userChoice = $(this).data('index');
        // also will send to another page
    });


    // for Clear All button
    $("#clear-all").on("click", function (event) {
        userList = [];
        localStorage.clear();
        /* Disable btn once used */
        $(this).disabled = "true";
        $("#playlists").empty()
    });

     /****BROKEN*****/
    // for remove 1 playlist at the time
    var resetIndex = function () {      // reinitilize index value in object
        $('p').each(function (i) {
            $(this).attr("data-index", i)
            userList[i].index = i;
        });
        localStorage.setItem('playlistsList', JSON.stringify(userList));
    }

    $(document).on('click', '#clear', function () {
        const playlistEl = $("<p>");
        let i = $(this).data('index');
        userList.splice(i, 1);
        $.when($(`.playlist-name:eq(${i})`).remove()).then(resetIndex());
    })

})