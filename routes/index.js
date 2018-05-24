var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var passport = require("passport");
var User = require("../models/user");

//Index
router.get("/", function(req, res){
    res.render("landing");
});

//Auth routes
router.get("/register", function(req, res){
    res.render("register");
});

//Signup route
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to yelpCamp " + user.username);
                res.redirect("/campgrounds");
            })
        }
    });
});
 
 
//login routes
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"  }), function(req, res){
    
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});


module.exports = router;