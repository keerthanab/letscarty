action('homePage', function () {
	
//console.log(req.user.displayName);

	render('home.ejs', {user: req.user.displayName, title: 'Welcome '+req.user.displayName+ '!'}  );


});