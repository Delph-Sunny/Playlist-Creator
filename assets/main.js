$(document).ready(function () {
    var userChoice = 0;
    var userList = JSON.parse(localStorage.getItem("playlistsList")) || [];
    $('.modal').modal();
    /***************FOR TESTING**********************/
    userList = [
        {
            index: 0,
            playlistName: "My running",
            description: "for Saturday workout",
            icon: "play_arrow",
            iconColor: "deep-orange lighten-3",
        },
        {
            index: 1,
            playlistName: "My second playlist",
            description: "for Sunday workout",
            icon: "android",
            iconColor: "light-green lighten-2",
        }
        ,
        {
            index: 2,
            playlistName: "My third playlist",
            description: "for week workout",
            icon: "beach_access",
            iconColor: "cyan",
        }
    ]
    localStorage.setItem("playlistsList", JSON.stringify(userList));
    /********************************************


 /*** Building the playlist list if any ***/
    function playlistBuild() {
        $(".collection").empty(); // To avoid repeated elements 
        // Looping through the array of playlists
        for (let i = 0; i < userList.length; i++) {
            var playlistEl = $(`<li class="collection-item avatar">`);
            // Adding attributes and children with text
            playlistEl.attr("data-name", userList[i].playlistName);
            playlistEl.attr("data-index", i);
            playlistEl.append(`<i class="material-icons circle ${userList[i].iconColor}">${userList[i].icon}</i>
            <span class="title playlist-title">${userList[i].playlistName}</span>
            <p>${userList[i].description}</p>
            <a href="#!" class="secondary-content" id="remove" data-index="${i}"><i class="material-icons">clear</i></a>`)
            $(".collection").append(playlistEl);
        };
    };

    playlistBuild();

    // when clicking on a playlist button
    $(document).on("click", ".collection-item", function (event) {
        event.preventDefault();
        userChoice = ($(this).data("index"));
        localStorage.setItem("index", JSON.stringify(userChoice));
        window.location.href = "playlistview.html";
    });

    // for Clear All button after confirmation with the modal
    $("#modal-yes").on("click", function (event) {
        userList = [];
        localStorage.clear();
        /* Disable btn once used */
        $(this).disabled = "true";
        $(".collection").empty()
    });

    // for remove 1 playlist at the time
    $(document).on("click", "#remove", function (event) {
        event.stopPropagation();
        let i = $(this).data("index");
        userList.splice(i, 1);
        for (let j = 0; j < userList.length; j++) { userList[j].index = j }
        localStorage.setItem("playlistsList", JSON.stringify(userList));
        playlistBuild()
    })
})
