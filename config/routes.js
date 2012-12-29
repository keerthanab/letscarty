var passport = require('passport');

exports.routes = function (map) {


    // root page routing
    map.root('outer#landingPage');

    map.get('/home', 'home#homePage');

    map.get('/uploadPic', 'home#uploadPic');

    map.get('/downPic', 'home#downloadPic');
 

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};
