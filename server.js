const travisTest = "Test code to see if Travis CI works";

//Requires NPM packages
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");

//Requiring passport as we've configured it
var passport = require("./config/passport");

//Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3333;
var db = require("./models");

//Creating express app and configuring middleware needed for authentication 
var app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

//Sessions to create tracking of user's login status
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({
    extname: 'exphbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/'
}))
app.set("view engine", "handlebars");

//Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

//Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    })
})