$(document).ready(function () {
    //   $.ajax({
    //     crossOrigin: true,
    //     type: "GET",
    //     crossDomain: false,
    //     url: "/api/getProjectAlgo",
    //     success: function(data) {
    //       console.log(data);
    //     }
    //   });
    // });

    $("#feedbackSubmit").on("click", function (event) {

        // feedback form validations
        if ($("#feedback_text").val().length < 140) {
          alert("Your feedback should be longer than 140 characters")
          return
        }

        if (!$('input[name="rating"]:checked').val()) {
          alert("Please select a rating")
          return
        }

        // increment feedback given of poster by 1
        $.ajax({
            crossOrigin: true,
            type: "PUT",
            data: {
                feedback_given: parseInt($("#feedback_given").text()) + 1,
            },
            crossDomain: false,
            url: "/api/feedbackGivenUpdate",
            success: function (data) {
                console.log(data);
            },
        });

        // post new feedback comment to db
        $.ajax({
            crossOrigin: true,
            type: "POST",
            data: {
                text: $("#feedback_text").val().trim(),
                rating: $('input[name="rating"]:checked').val(),
                ProjectId: parseInt($("#project-name").attr("data-id")),
            },
            crossDomain: false,
            url: "/api/newFeedback",
            success: function (data) {
                console.log(data);
                console.log(data.createdAt);

                //update last_commented field in db
                $.ajax({
                    crossOrigin: true,
                    type: "PUT",
                    data: {
                        last_commented: data.createdAt.split("T")[0],
                        projectId: parseInt($("#project-name").attr("data-id")),
                    },
                    crossDomain: false,
                    url: "/api/updateLastCommented",
                    success: function (data) {
                        console.log(data);
                    },
                });
            },
        });
    });
});
