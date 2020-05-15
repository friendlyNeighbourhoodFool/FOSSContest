//all the middlewares
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req, res, next){
	//is user even logged in
	if(req.isAuthenticated()){
		//does the user own the campground
			Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			req.flash("error","Oops! somethin went wrong.Maybe the campground was not found!");
			res.redirect("back");
		}else if(foundCampground.author.id.equals(req.user._id)){
			next();		
		}else{
			req.flash("error","You need to be logged in to do that!");
			res.redirect("back");
		}
	});

	}else{
		req.flash("error","You need to be logged in to do that!");
		res.redirect("back");
	}

}

middlewareObj.checkCommentOwnership=function(req, res, next){
	//is user even logged in
	if(req.isAuthenticated()){
		//does the user own the comment 
			Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			req.flash("error","Oops! somethin went wrong.Maybe the comment was not found!");
			res.redirect("back");
		}else if(foundComment.author.id.equals(req.user._id)){
			next();		
		}else{
			req.flash("error","You don't have the permission to do that");
			res.redirect("back");
		}
	});

	}else{
		req.flash("error","You need to be logged in to do that!");
		res.redirect("back");
	}

}

middlewareObj.isLoggedIn=function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to do that!");
	res.redirect("/login");
}

module.exports=middlewareObj;