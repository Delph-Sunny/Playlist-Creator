$(document).ready(function () {
    var userChoice = JSON.parse(localStorage.getItem("index")) || {};
    var userList = JSON.parse(localStorage.getItem("playlistsList")) || [];

    /***************FOR TESTING**********************/
    userList = [
        {
            index: 0,
            playlistName: "My running",
            description: "for Saturday workout",
            icon: "play_arrow",
            iconColor: "orange",
        },
        {
            index: 1,
            playlistName: "My second playlist",
            description: "for Sunday workout",
            icon: "android",
            iconColor: "red",
        }
        ,
        {
            index: 2,
            playlistName: "My third playlist",
            description: "for week workout",
            icon: "beach_access",
            iconColor: "blue",
        }
    ]
    localStorage.setItem("playlistsList", JSON.stringify(userList));
    /********************************************


 /*** Building the playlist list if any ***/
    function playlistBuild() {
        $(".collection").empty(); // To avoid repeated elements 
        console.log(userList)                           // FOR TESTING
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
        userChoice = ($(this).data('index'));

        localStorage.setItem("index", JSON.stringify(userChoice));
        window.location.href="playlistview.html";
    });

    // for Clear All button
    $("#clear-all").on("click", function (event) {
        //   M.toast({ html: `Are you sure you want to delete all playlists?`, classes: 'rounded' })
        userList = [];
        localStorage.clear();
        /* Disable btn once used */
        $(this).disabled = "true";
        $(".collection").empty()
    });

    /****BROKEN*****/
    // for remove 1 playlist at the time
    var resetIndex = function () {      // reinitilize index value in object
        $('li').each(function (i) {
            $(this).attr("data-index", i)
            userList[i].index = i;
        });
        localStorage.setItem("playlistsList", JSON.stringify(userList));
    }

    $(document).on('click', '#remove', function () {
        const playlistEl = $("<li>");
        console.log($(this).data('index'))
      let i = $(this).data('index');
      userList.splice(i, 1);
      $.when($(`.collection-item:eq(${i})`).remove()).then(resetIndex());
    })

})
