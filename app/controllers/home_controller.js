action('homePage', function () {
	
//console.log(req.user.displayName);
var user = new User(req.user);

user.getDisplayName();
	
	render('home.ejs', {user: req.user.displayName, title: 'Welcome '+req.user.displayName+ '!'}  );


});

//################ AMAZON InIT Code ############################
var configKeys = require('../bumpy/config/config_keys.keys');
var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: configKeys.development.AMAZON_ID, 
	secretAccessKey: configKeys.development.AMAZON_SECRET});
//AWS.config.update({accessKeyId: 'AKIAIANJ4E5XFAUZ5XLQ', 
//	secretAccessKey: 'jq3axHDCYLr8Qyf1t5lQgeZ3ZtuHB1dljnQJSgr9'});

// Set your region for future requests.
AWS.config.update({region: configKeys.development.AMAZON_REGION});

var s3 = new AWS.S3();



//############## AMAZON init Code Ends #########################

action('uploadPic', function () {

//am reading the file to be uploaded into fs
var fs = require('fs');


//----------- Uploading the file-----------------------------------------------
fs.readFile('../bumpy/public/images/compound.png', function(err, fileData){
if(err){
	console.log('Error in reading file into fs '+err)
}else{
     
s3.client.createBucket({Bucket: 'chiti'}, function(err, bucData) {
if(err){
console.log('Err while creating bucket in S3'+err);
} else{


  var data = {Bucket: 'chiti', Key: 'myPic', Body: fileData, ContentType : 'image'};
  s3.client.putObject(data, function(err, data) {
  	
    if (err) {
      console.log("Error uploading data into S3: ", err);
    } else {
      console.log("Successfully uploaded Pic into S3");
    }
  });
}
});

}
	
});



	render('home.ejs', {user: req.user, title: 'Welcome '+req.user+ '!'}  );


});



action('downloadPic', function () {

//am reading the file to be uploaded into fs
var fs = require('fs');


//----------- Downloading the file-----------------------------------------------
var file = fs.createWriteStream('../bumpy/s3Images/compound.png');


  var data = {Bucket: 'chiti', Key: 'myPic'};
  s3.client.getObject(data, function(err, fileData) {
  	
    if (err) {
      console.log("Error dwonloading data from S3: ", err);
    } else {
      console.log("Successfully Downloaded Pic from S3");
      console.log(JSON.stringify(eval(fileData.body)));
      file.write(fileData.body);
      file.end();
      console.log('Pic stored in /s3Images/');
    }
  });

	render('home.ejs', {user: req.user, title: 'Welcome '+req.user+ '!'}  );


});