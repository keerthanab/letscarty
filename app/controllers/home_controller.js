action('homePage', function () {
	
//console.log(req.user.displayName);
var user = new User;
//user= req.user;

console.log("Hello Model");
user.getDisplayName();

	render('home.ejs', {user: req.user.displayName, title: 'Welcome '+req.user.displayName+ '!'}  );


});