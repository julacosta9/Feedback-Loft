$(document).ready(function () {
    getUserData();

    async function getUserData() {
        let userData = await $.get("/api/user_data");

        console.log(userData);

        let feedbackGiven = (userData.feedback_given) ? userData.feedback_given : "0"
        let feedbackReceived = (userData.feedback_received) ? userData.feedback_received : "0"

        $("#feedback_given").text(feedbackGiven)
        $("#feedback_received").text(feedbackReceived)
        $("#username-h1").text(`${userData.email}'s Dashboard`)
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
