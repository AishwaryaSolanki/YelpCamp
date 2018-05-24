var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");


//root
router.get("/", function(req, res){
    // get camgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
    
});


//Create
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.desc;
    var price = req.body.price;
    
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcamp = { name: name,  image: image, description: description, author: author, price: price };
    
    Campground.create(newcamp, function(err, newCampground){
        if(err){
            console.log(err);
        }
        else{
            
            res.redirect("/campgrounds");
        }
    })
});


//New
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");    
});



//defined later for a reason
router.get("/:id", function(req, res){
    //find campgorund with the id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Error: "+ err);
        }
        else{
                
                res.render("campgrounds/show", {campground: foundCampground});
        }
});
    //render all the info about it
    //shows more info about one camp
});

//edit
router.get("/:id/edit", middleware.checkUser, function(req, res){
    //if user is logged in
     Campground.findById(req.params.id, function(err, foundCampground){
         if(err){
             console.log(err);
         }
    //does he own the campground
    res.render("campgrounds/edit", {campground: foundCampground});
    //no?, redirect
});
});

//update
router.put("/:id",middleware.checkUser, function(req,res){
    //find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            res.redirect("/campgrounds/");
        } 
        else{
            res.redirect("/campgrounds/" + updatedCamp._id);
        }
    })
    //redirect
});


//destroy
router.delete("/:id", middleware.checkUser, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    })
});


//export
module.exports = router;