$(document).ready(function () {
    console.log("I'm getting to this script!!")
    getUserData();

    function getUserData() {
        $.get("/api/user_data", function (req, res) {})
            .then(data => {
                console.log(data);
            })
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
