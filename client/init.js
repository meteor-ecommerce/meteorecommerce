

Meteor.startup(function() {
  Uploader.finished = function(index, file) {

  	// when user uploads the image get the id of the image if the insertion is succesful //
    var x = Uploads.insert(file, function(error,result){
    	if(!error){
    		return result;
    	}
    });
    console.log(x);
    //console.log($['name=pName']).val();

    // set the session for the url of image to be inserted into local collections //
    Session.set('urlOfImg',Uploads.findOne({_id:x}).url);
    console.log(Uploads.findOne({_id:x}).url);

  }



});