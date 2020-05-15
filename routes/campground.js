var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");//since no file specified therefore automatically index is acquired

//index-display all campgrounds

router.get("/campgrounds",function(req,res){
	//Get all campgrounds from DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
		}
	});
	// res.render("campgrounds",{campgrounds:campgrounds});
});

//create- add to db
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var price=req.body.price;
	var newCampground={name: name,price: price,image: image,description:desc,author:author};
	
	//create a new campground and save it to db
	Campground.create(newCampground,function(err,newlyCreated){
	if(err){
		console.log(err);
	}
	else{
		console.log(newlyCreated);
		res.redirect("/campgrounds");
	}
});
	// campgrounds.push(newCampground);
	//default redirect is always to get method
	
});

//new-display form

router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new")
});

//show page

router.get("/campgrounds/:id",function(req,res){
	//find the campground with provided id
	//render shw template with that campground
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show",{campground:foundCampground});
		}
	});
	
});

//edit campground route

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render("campgrounds/edit",{campground:foundCampground});		
		
	});
});


//update campground route

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//destroy campground route
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	}); 
});



module.exports=router;