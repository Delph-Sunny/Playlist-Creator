M.AutoInit();
var userList = JSON.parse(localStorage.getItem("playlistsList")) || [];
var newList = {};
var newIndex;
var newIcon, newColor;

// Getting the the new index for the new playlist
if (userList.length == 0) {
    newIndex = 0;
} else {
    newIndex = userList.length;
}


// Dropdown listeners
$('#dropdown1').click(e => {  
    newIcon = e.target.firstChild.textContent;
    if (typeof newIcon  == "undefined") {
        newIcon = "music_video" // Default icon
    }
    console.log(newIcon)
})

$('#dropdown2').click(e => {   
    console.log(e.target.firstChild.textContent)       // FOR TESTING
    newColor = e.target.firstChild.textContent;
    if (typeof newColor  == "undefined") {
        newColor = "orange"  // Default color for icon background
    }
})


// Create new playlist
$("#forward").click(e => {
    console.log(newIcon + "," + newColor)
    e.preventDefault();
    var newName = $("#input_text").val();
    // Mandatory field for name
    if (newName != "") {
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
        newList.description = newDescription.trim();
    }
    else {
        newList.description = "";
    }

    newList.icon = newIcon;
    newList.iconColor = newColor;
    // Populate array and store locally
    userList.push(newList);
    localStorage.setItem("playlistsList", JSON.stringify(userList));
    localStorage.setItem("index", JSON.stringify(newIndex));
   // window.location.href = "results.html" // send to add songs page
})

$("#back").click(e => {
    window.location.href = "index.html"     // return to home page
})


