M.AutoInit();
// Enter New Playlist
$("#create-playlist").on("click", function (event) {
    event.preventDefault();
    var userList = JSON.parse(localStorage.getItem("playlistsList")) || [];
    var newList = {};
    var newIndex;
    var newName = $("#input_text").val();
    // Mandatory field for name
    if (newName != "") {
        if (userList.length == 0) {
            newIndex = 0;
        } else {
            newIndex = userList.length;
        }
        newList.index = newIndex
        newList.playlistName = newName.trim();
    }
    else {
        M.toast({ html: `Ooops! <br> Your forgot to enter a playlist name.`, classes: 'rounded' })
        // $(".helper-text").text("Ooops! Your forgot to enter a playlist name", 4000);
        return;
    }
    var newDescription = $("#input_text2").val()
    if (newDescription != "") {
        newList.description = ""
    }
    else {
        newList.description = newDescription.trim();
    }
/* Broken
    var newIcon = $( "selectdropdown1 option:checked" ).val();
    if (newIcon != "") {
        newList.icon = "music_video" // Default icon
    }
    else {
        newList.icon = newIcon;
    }

     
    var newColor = $('#dropdown2').dropdown();
    console.log(newColor)
    if (newColor != "") {
        newList.iconColor = "orange"  // Default color for icon background
    }
    else {
        newList.iconColor = newColor;
    }
    */
    userList.push(newList); 
    localStorage.setItem("playlistsList", JSON.stringify(userList));
    localStorage.setItem("index", JSON.stringify(newIndex));
    window.location.href = "results.html"
})




