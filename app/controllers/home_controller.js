action('homePage', function () {
	
//console.log(req.user.displayName);
var user = new User(req.user);
console.log("This is from controller");
console.log(req.user);
user.getDisplayName();
	
	render('home.ejs', {user: req.user.displayName, 
		title: 'Welcome '+req.user.displayName+ '!',
		thumbnail: req.user._json.thumbnail_url}  );


});