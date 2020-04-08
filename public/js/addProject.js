$(document).ready(function() {
    var modal = $(".modal");
    var span = $(".close");

    $(".project").on("click", function (){
        console.log(modal.text());
        modal.attr("style", "display: block");
    });

    span.on("click", function (){
        console.log(modal.text());
        modal.attr("style", "display: none");
    });

    $(".submitProject").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        console.log("HI");
    
        var newProject = {
            name: $("#project-title").val().trim(),
            url: $("#project-url").val().trim(),
            description: $("#project-feedback").val().trim()
        };

        addProject(newProject);
    });

    function addProject (newProject) {
        $.post("/api/addProject", newProject)
          .then(function() {
            console.log("Added your project!");
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    // window.on("click", function(event) {
    //     if (event.target == modal) {
    //         modal.attr("style", "display: none");
    //     }
    // });
});

// When the user clicks anywhere outside of the modal, close it
