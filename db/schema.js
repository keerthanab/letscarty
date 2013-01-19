/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

module.exports = function (mongoose, compound) {
    // mongoose stuff
    var serviceSchema = new mongoose.Schema({
    _social_link:{
                    url: {type: String, unique: false, required: false },
                    handle: {type: String, unique: false, required: false },
                    email: {type: String, unique: false, required: false },
                    work: {type: String, unique: false, required: false },
                    description: {type: String, unique: false, required: false },
                    thumbnail_url: {type: String, unique: false, required: false },
                    id: {type: String, unique: false, required: false },
                    location: {type: String, unique: false, required: false },
                    entry: {type: String, unique: false, required: false },
                    name: {type: String, unique: false, required: false }
                }
                    
    }); 

    var Services = mongoose.model('Services', serviceSchema);
    Services.modelName = 'Services';
    compound.models.Services = Services;

    var userSchema = mongoose.Schema({ provider: String,
    id: String,
    username: String,
    displayName: String,
    emails: [{value: String}],
    _raw: [mongoose.Schema.Types.Mixed],
    _json: {id: String,
    		services: [serviceSchema],
    		url: String,
    		description: String,
    		thumbnail_url: String,
    		location: String,
    		name: String,
    		handle: String,
    		email: String,
    		work: String,
    		gravatar: String
    		}
    	});
    
    var User = mongoose.model('User', userSchema);

    // expose model name for view helpers (resource-based helpers like formFor)
    User.modelName = 'User';

    // register model in compound.models registry
    compound.models.User = User;
};
