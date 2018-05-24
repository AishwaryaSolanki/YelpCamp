var middlewareObj = {};
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

middlewareObj.checkUser=
function(req, res, next) {
    
        if(req.isAuthenticated()){
        
      Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           req.flash("error", "Campground not found");
           res.redirect("back");
       } 
       else{
           //does he own the campground
           if(foundCampground.author.id.equals(req.user._id)){
               next();
                }
           else{
               req.flash("error", "You don't have permission to do that");
               res.redirect("back");
           }
       }
    });
    }
    else{
       req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkcomments = 

function(req, res, next){
        if(req.isAuthenticated()){
        //if user is logged in
            Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
       } 
       else{
           //does he own the comment
           if(foundComment.author.id.equals(req.user._id)){
                        next();
                }
           else{
               req.flash("error", "You don't have permission to do that");
               res.redirect("back");
           }
       }
    });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};


middlewareObj.isLoggedIn =
function(req, res, next){
    if(req.isAuthenticated()){
        return next();
        
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;

//either deifne different function
//either one object with objs as functions
//return the obj