// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.render('main');
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    var UserId = req.user.id;
    res.redirect("/api/getProjects/" + UserId);
  });

  app.get("/giveFeedback", function(req, res) {
    // If the user already has an account send them to the members page
    if (!req.user) {
      res.redirect("/");
    }

    db.Project.findAll({
      include: [
          {
              model: db.User,
              as: "User",
              where: db.sequelize.where(
                  db.sequelize.literal("feedback_given"),
                  ">",
                  db.sequelize.literal("feedback_received")
              ),
          },
      ],
      order: [['last_commented', 'ASC']]
  }).then((data) => {
      res.render("project-review", {projectData: data[0].dataValues})
      console.log(data[0].dataValues);
    });
  });
};
