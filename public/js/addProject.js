$(document).ready(function() {
    var modal = $("#myModal");
    var close = $(".close");
    var review = $("#reviewModal");
    var edit = $(".edit")

    $(".project").on("click", function (){
        modal.attr("style", "display: block");
    });

    edit.on("click", function (){
        var projectId = $(this).attr("data");
        $.get(`/api/findProjects/${projectId}`, function (req, res){
            var text = $("#currentRequest");
            var desc = $("<p>").text(req.description);
            text.empty();
            text.append(desc);
            review.attr("style", "display: block");
        });
        $(".editProject").on("submit", function(event) {
            // Make sure to preventDefault on a submit event.
            var description = $("#newDesc").val().trim();
            $.get(`/api/editProjects/${projectId}/${description}`, function (req, res){
                
            })
        });
    });

    close.on("click", function (){
        modal.attr("style", "display: none");
        review.attr("style", "display: none");
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
