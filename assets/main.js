var userChoice = JSON.parse(localStorage.getItem("index")) || {};
var userList = JSON.parse(localStorage.getItem("#")) || {};

userList = [           // FOR TESTING
    {
        index: "0",
        playlistName: "My running",
        description: "for Saturday workout"
    }
]


// when clicking on a playlist button
$(document).on("click", ".playlist-name", function (event) {
    userChoice = $(this).data('index');
    // also will send to another page
});

/*** Building the playlist list if any ***/
function playlistList() {
    $("#playlists").empty(); // To avoid repeated elements 

    // Looping through the array of playlists
    for (let i = 0; i < userList.length; i++) {
        var playlistEl = $("<div>");
        // Adding a class, attribute and text
        playlistEl.addClass("playlist-name");
        playlistEl.attr("data-name", userList[i].playlistName);
        playlistEl.attr("data-index", i);
        $("#playlists").append(playlistEl);
    }
}



// for delete buttons  
$("#clear-all").on("click", function (event) {
    userList = [];
    localStorage.clear();
    /* Disable btn once used */
    $(this).disabled = "true";
    $("#playlists").empty()
});

$("#clear").on("click", function (event) {
    event.preventDefault();
    userList = [];
    localStorage.clear();
   
});

