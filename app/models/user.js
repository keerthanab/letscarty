
module.exports = function (compound, User) {

    User.prototype.getDisplayName = function getDisplayName() {
    	console.log("this is from within model");
    	console.log(this);
		console.log(this.displayName);
    };

};