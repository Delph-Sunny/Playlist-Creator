callADB = function(title,artist) {
    var queryURL = `https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=${artist}&t=${title}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        if(response.track !== null) {
            displayResults(response);
        } else {
            // Modal error: can't find track
            
        }
    });
}

displayResults = function(response) {
    console.log(response);
}

// Event listener - Submit API call
$("#search-form").submit(function(event){
    event.preventDefault();
    var title = $("#title")[0].value;
    var artist = $("#artist")[0].value;
    callADB(title,artist);
})

// Event listener - Go to playlist
$(".playlist-link").click(function(){
    window.location = "playlistview.html";
});