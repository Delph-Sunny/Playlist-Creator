// Enter New Playlist
$("#create-playlist").on("click", function (event) {
    event.preventDefault();
    var userList = JSON.parse(localStorage.getItem("playlistsList")) || [];
    var newList = {};
    var newIndex;
    var newName = $("#name-playlist").val().trim();
    if (newName != "") {
        if (userList.length == 0) {
            newIndex = 0;
        } else {
            newIndex = userList.length;
        }
        newList.index = newIndex
        newList.playlistName = newName;
    }
    else {
        M.toast({ html: `Ooops! <br> Your forgot to enter a playlist name.`, classes: 'rounded' })
        // $(".helper-text").text("Ooops! Your forgot to enter a playlist name", 4000);
        return;
    }
    console.log(newList);
    console.log(newIndex)
    var newDescription = $("#text-area").val().trim();
    newList.description = newDescription;

    userList.push(newList);
    localStorage.setItem("playlistsList", JSON.stringify(userList));
    localStorage.setItem("index", JSON.stringify(newIndex));
})




