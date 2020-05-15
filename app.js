var express       =require("express");
var app           =express();
var bodyParser    =require("body-parser");
var mongoose      =require("mongoose");
mongoose.connect("mongodb+srv://iec2019037:Passmongodb1089!@cluster0-3t2z2.gcp.mongodb.net/test?retryWrites=true&w=majority");
var Campground    =require("./models/campground");
var seedDB        =require("./seeds");
var Comment       =require("./models/comment");
var passport      =require("passport");
var LocalStrategy =require("passport-local");
var User          =require("./models/user.ejs");
var methodOverride=require("method-override");
var flash         =require("connect-flash");

//requiring routes
var commentRoutes   =require("./routes/comments");
var campgroundRoutes=require("./routes/campground");



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();//seed the database

//=================
//passport configuration
//=================

app.use(require("express-session")({
	secret:"I love open source!",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//===================
//===================

//middleware passing user info to all pages
app.use(function(req, res, next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

//asking express to use all our routes


app.use(campgroundRoutes);
app.use(commentRoutes);

//root route
app.get("/",function(req,res){
	res.render("landing");
});

//==============
//Auth routes
//==============

//show register form
app.get("/register",function(req,res){
	res.render("register");
});

//handle sign up logic
app.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to YelpCamp "+user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form
app.get("/login",function(req,res){
	res.render("login");
});

//handle login logic
app.post("/login",passport.authenticate("local",
		{
			successRedirect:"/campgrounds",
			failureRedirect:"/login"
		}),function(req,res){
//can remove this callback as well
});

//logout route
app.get("/logout",function(req,res){
	req.logout(); 
	req.flash("success","Logout Successful!");
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


app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Server is live now!! :)");
});
