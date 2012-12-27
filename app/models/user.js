
module.exports = function (compound, User) {

    User.prototype.getDisplayName = function getDisplayName() {
		console.log(this.displayName);
    };

};