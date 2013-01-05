
//require('../../config/environment.js');
before(ensureAuthenticated, { only: ['homePage', 'downloadPic', 'uploadPic'] });

function ensureAuthenticated() {
  if (req.user) {
    next();
  }else{
  redirect('/');
}
}


action('homePage', function () {
	
console.log(JSON.stringify(req.user));
var user = new User(req.user);

user.getDisplayName();
	
	render('home.ejs', {user: req.user.displayName, picUrl: undefined, title: 'Welcome '+req.user.displayName+ '!'}  );


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

console.log("file-size:"+req.files.uploadedPic.size);

//creating new Objectid for each of the photo uploaded
var ObjectId = require('mongoose').Types.ObjectId;
var photoId = new ObjectId();
console.log(photoId);

//am reading the file to be uploaded into fs
var fs = require('fs');


//----------- Uploading the file-----------------------------------------------
fs.readFile(req.files.uploadedPic.path, function(err, fileData){
if(err){
	console.log('Error in reading file into fs '+err);
  flash('error', 'Error in readng file');
}else{
     
s3.client.createBucket({Bucket: 'chiti'}, function(err, bucData) {
if(err){
console.log('Err while creating bucket in S3'+err);
flash('error', 'Error in creating bucket in S3');
} else{


  var data = {Bucket: 'chiti', Key: photoId, Body: fileData, ContentType : 'image'};
  s3.client.putObject(data, function(err, data) {
  	
    if (err) {
      console.log("Error uploading data into S3: ", err);
      flash('error', 'Error while uploading... Pl try again:(');

    } else {
      console.log("Successfully uploaded Pic into S3");
          flash('info', 'Successfully uploaded ur Pic:)');
    }

    redirect('/home');

  });
}
});
}
});

});



action('downloadPic', function () {

  
var crypto = require('crypto')
  , canonicalString 
  , key = configKeys.development.AMAZON_SECRET
  , signature
   , date = Math.ceil(Date.now()/1000)
  , expiryTime = 120;

date=date+expiryTime;
//prep canonical string 
canonicalString="GET\n\n\n"+date+"\n/chiti/myPic";

//prep signature using Amazon Secret key, Canonical String
signature = crypto.createHmac('sha1', key).update(canonicalString).digest('base64');
console.log(signature);
//encode the signature
var encSig =  encodeURIComponent(signature);
console.log(encSig);

//build the url finally
var url = 'http://s3.amazonaws.com/chiti/myPic?AWSAccessKeyId='+configKeys.development.AMAZON_ID+'&Expires='+date+'&Signature='+encSig;

//var url = 'http://s3.amazonaws.com/chiti/myPic?AWSAccessKeyId='+configKeys.development.AMAZON_ID+'&Expires='+date+'&Signature='+signature;

console.log(url);


render('home.ejs', {user: req.user.displayName, picUrl: url, title: 'Welcome '+req.user.displayName+ '!'}  );

});