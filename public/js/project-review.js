$( document ).ready(function() {
  $.ajax({
    crossOrigin: true,
    type: "GET",
    crossDomain: false,
    url: "/api/getProjectAlgo",
    success: function(data) {
      console.log(data);
    }
  });
});

$("#feedbackSubmit").on("click", function(event) {

  $.ajax({
    crossOrigin: true,
    type: "PUT",
    data: {
      feedback_given: parseInt($("#feedback_given").text()) + 1
    },
    crossDomain: false,
    url: "/api/feedbackGivenUpdate",
    success: function(data) {
      console.log(data);
    }
  });

  $.ajax({
    crossOrigin: true,
    type: "POST",
    data: {
      text: $("#feedback_text").val().trim(),
      rating: $('input[name="rating"]:checked').val(),
      ProjectId: parseInt($("#project-name").attr("data-id"))
    },
    crossDomain: false,
    url: "/api/newFeedback",
    success: function(data) {
      console.log(data);
      console.log(data.createdAt);

      $.ajax({
        crossOrigin: true,
        type: "PUT",
        data: {
          last_commented: data.createdAt.split("T")[0],
          projectId: parseInt($("#project-name").attr("data-id"))
        },
        crossDomain: false,
        url: "/api/updateLastCommented",
        success: function(data) {
          console.log(data);
        }
      });
    }
  });
})