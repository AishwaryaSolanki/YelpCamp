var express = require("express");
var bodyParser = require("body-parser");
var request = require('request');
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var localStrategy = require("passport-local");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

// var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
// mongoose.connect(process.env.DATABASEURL);
mongoose.connect("mongodb://localhost/yelp_camp");

var User = require("./models/user");
var method = require("method-override");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//initial data
//seedDB();

//exporting routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//flash
app.use(flash());
//passport config
app.use(require("express-session")({
    secret: "I need a dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success= req.flash("success");
    next();
});
app.use(method("_method")); 


//using routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


//listening
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});