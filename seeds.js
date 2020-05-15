var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
{
	name:"Cloud's Rest",
	image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
},
{
	name:"Kent Survival",
	image:"https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
},
{
	name:"Canyon Floor",
	image:"https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." 
}
];

function seedDB(){

//empty the database
Campground.remove({},function(err){
	// if(err){
	// 	console.log(err);
	// }else{
	// 	console.log("Removed all campgrounds");
	// 	//add a few camppgrounds
	// 	data.forEach(function(seed){
	// 		Campground.create(seed,function(err,campground){
	// 			if(err){
	// 			console.log(err);
	// 			}else{
	// 			console.log("Added a campground");
	// 			//create a comment
	// 			Comment.create({
	// 				text:"This is a great place!",
	// 				author:"Homie"
	// 			},function(err,comment){
	// 				if(err){
	// 					console.log(err);
	// 				}else{
	// 				campground.comments.push(comment);
	// 				campground.save();
	// 				console.log("Created new comment!");
	// 			}
	// 			});
	// 			}	

	// 		});
	// 	});

	// }
	
});
}

module.exports=seedDB;