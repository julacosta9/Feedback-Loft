$(document).ready(function () {
    $.get("/api/user_data", function (req, res) {
        var UserId = req.id;
        getProject(UserId);
    });

    function getProject(UserId) {
        $.get("/api/getProjects/" + UserId, function (req, res) {})
            .then(function () {})
            .catch(function (err) {
                console.log(err);
            });
    }

    // $("#feedButton").on("click", function () {
    //     $.get("/api/getProjectAlgo/", function (req, res) {})
    //         .then(function (data) {
    //             console.log(data);
    //             res.render("project-review", {projectData: data[0].dataValues});
    //         })
    //         .catch(function (err) {
    //             console.log(err);
    //         });
    // });

    $("#feedButton").on("click", function () {
        $.ajax({
            crossOrigin: true,
            type: "GET",
            crossDomain: false,
            url: "/api/getProjectAlgo",
            success: function (data) {
            },
        });
    })

    // $("#edit").on("click", function (){
    //     // var header = $("<h3>").text("Current Request:");
    //     // var request = $("<p>").text()

    // })
});
