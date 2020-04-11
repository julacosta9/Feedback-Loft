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
            res.json({
                email: req.user.email,
                id: req.user.id,
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
            res.json(data);
        });
    });
};
