action('landingPage', function () {
	

	render('landing.ejs', {user: req.user, title: 'Let\'s Carty'}  );


});