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