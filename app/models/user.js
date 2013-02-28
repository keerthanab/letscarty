
module.exports = function (compound, User) {

    User.prototype.getDisplayName = function getDisplayName() {
    	console.log("this is from within model");
    	console.log(this);
		console.log(this.displayName);
    };

    User.prototype.saveUserDetails = function saveUserDetails() {
    	console.log("this is from within model saveUserDetails");

		this.save( function(error){ //here 'this' keyword refers to User object 
	   		 if(error){
				console.log("Sorry dude, error in saving :( ");	
	        	res.json(error);
	   		 }
	    	else{
	       		 console.log("Yay saved all :) ");
	        	//mongoose.disconnect();	      
	    	}
		});   
    };


};