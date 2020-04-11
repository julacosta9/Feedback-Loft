$(document).ready(function () {
    $.get("/api/user_data", function (req, res) {
        var UserId = req.id;
        getProject(UserId);
    });

    function getProject(UserId) {
        $.get("/api/getProjects/" + UserId, function (req, res) {})
            .then(function () {
                
            })
            .catch(function (err) {
                console.log(err);
            })
    };

    $("#feedButton").on("click", function (){
        $.get("/giveFeedback", function (req, res) {})
        .catch(function (err) {
            console.log(err);
        });
    })

    // $("#edit").on("click", function (){
    //     // var header = $("<h3>").text("Current Request:");
    //     // var request = $("<p>").text()

    // })
});