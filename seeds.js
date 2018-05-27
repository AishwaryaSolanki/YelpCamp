var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
        {name: "Cloud's Rest",
        image :  "https://lastingadventures.com/wp-content/uploads/2013/11/Clouds-Rest-Spine-Hiking-Yosemite.jpg",
        desc : "Blah blah blah blah blah Blah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blah"
        },
        {name: "Paradise Camp",
        image :  "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg",
        desc : "Blah blah blah blah blah Blah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blah"
        },
        {name: "Salmon Creek",
        image :  "https://alba24.ro/wp-content/uploads/2015/06/corturi-de-camping.jpg",
        desc : "Blah blah blah blah blah Blah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blahBlah blah blah blah blah"
        }
    ];

 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 /*Hey there*/
module.exports = seedDB;
