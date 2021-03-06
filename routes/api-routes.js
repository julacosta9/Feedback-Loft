// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password,
      })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.User.findOne({
        where: {
          id: req.user.id,
        }
      })
      .then(data => {
        res.json({
          id: data.id,
          email: data.email,
          feedback_received: data.feedback_received,
          feedback_given: data.feedback_given,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        })
      });
    }
  });

  app.post("/api/addProject", function (req, res) {
    db.Project.create({
      name: req.body.name,
      url: req.body.url,
      description: req.body.description,
      UserId: req.body.UserId,
    }).then(function () {
      console.log("project inserted");
      res.redirect("/members");
    });
  });

  app.get("/api/getProjects/:id", function (req, res) {
    db.Project.findAll({
      where: {
        UserId: req.params.id,
      },
    }).then(function (dbProject) {
      var full;
      if (dbProject.length < 3) full = false;
      else full = true;

      var hbsObject = {
        project: dbProject,
        add: full,
      };
      res.render("dashboard", hbsObject);
    });
  });

  app.get("/api/getProjectAlgo/", (req, res) => {
    db.Project.findAll({
      include: [{
        model: db.User,
        as: "User",
        where: db.sequelize.where(
          db.sequelize.literal("feedback_given"),
          ">",
          db.sequelize.literal("feedback_received")
        ),
      }, ],
      order: [
        ['last_commented', 'ASC']
      ]
    }).then((data) => {
      res.render("project-review", {
        message: "hello"
      })
      console.log(data[0].dataValues);
    });
  });

  app.get("/api/findProjects/:pid", function (req, res) {
    db.Project.findOne({
      where: {
        UserId: req.user.id,
        id: req.params.pid
      }
    }).then(function (dbProject) {
      res.json(dbProject);
    });
  });

  app.get("/api/editProjects/:pid/:ndsc", function (req, res) {
    db.Project.update({
      description: req.params.ndsc
    }, {
      where: {
        UserId: req.user.id,
        id: req.params.pid
      }
    }).then(function (dbProject) {
      console.log(dbProject);
    });
  });

  app.get("/api/deleteProject/:id", function (req, res){
    db.Project.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (project){
      console.log(project);
    })
  });

  app.get("/api/deleteProject/:id", function (req, res){
    db.Feedback.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (project){
      console.log(project);
    })
  });

  app.post("/api/newFeedback", function (req, res){
    db.Feedback.create({
      text: req.body.text,
      rating: req.body.rating,
      UserId: req.user.id,
      ProjectId: req.body.ProjectId
    }).then(function (feedback){
      res.json(feedback)
      console.log("Feedback Inserted");
      // console.log(feedback);
    })
  });

  app.put("/api/feedbackGivenUpdate", function (req, res){
    db.User.update({
      feedback_given: req.body.feedback_given
    },
    {
      where: {
        id: req.user.id
      }
    }).then(function (User){
      res.json(User)
      console.log("Feedback Given Updated");
      // console.log(User);
    })
  });

  app.put("/api/updateLastCommented", function (req, res){
    db.Project.update({
      last_commented: req.body.last_commented
    },
    {
      where: {
        id: req.body.projectId
      }
    }).then(function (Project){
      res.json(Project)
      console.log("---Last Commented Timestamp Updated---");
      console.log(Project);
    })
  });
};