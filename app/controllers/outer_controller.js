action('landingPage', function () {
	
	if(req.user) {
		redirect('/home');
	} else {
		render('landing.ejs', {user: req.user, title: 'Let\'s Carty'}  );
	}

});