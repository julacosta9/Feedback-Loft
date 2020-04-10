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
        $.get("/api/user_data", function (req, res){
            var newProject = {
                name: $("#project-title").val().trim(),
                url: $("#project-url").val().trim(),
                description: $("#project-feedback").val().trim(),
                UserId: req.id
            };
            addProject(newProject);
        })
    });

    function addProject (newProject) {
       
        $.post("/api/addProject", newProject)
          .then(function() {
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    
    
});

// When the user clicks anywhere outside of the modal, close it
