action('landingPage', function () {
	

	render('landing.ejs', {user: req.user, title: 'Envwe & Get Envweed!'}  );


});