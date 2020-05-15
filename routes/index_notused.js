var express=require("express");
var router=express.Router();
var User=require("../models/user");
var passport=require("passport");


//root route
router.get("/",function(req,res){
	res.render("landing");
});


//==============
//Auth routes
//==============

//show register form
router.get("/register",function(req,res){
	res.render("register");
});

//handle sign up logic
router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login",function(req,res){
	res.render("login");
});

//handle login logic
router.post("/login",passport.authenticate("local",
		{
			successRedirect:"/campgrounds",
			failureRedirect:"/login"
		}),function(req,res){
//can remove this callback as well
});

//logout route
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

//========
//middleware for adding in comments
//========
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports=router;