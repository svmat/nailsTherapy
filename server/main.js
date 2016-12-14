// code that is only sent to the server. 

Meteor.startup(function () {
    process.env.MAIL_URL="smtp://postmaster%40sandboxf30ffc0b236a46f2bce99e4a6a33b24b.mailgun.org:cf5f996c35e54c6b5041e3a1fb86f35a@smtp.mailgun.org:587";
  // create a starter if necessary
  if (DesignImages.find().count() == 0){
  	for (var i=1;i<41;i++){
  		DesignImages.insert(
  			{
  				img_src:"/design_"+i+".jpg",
  				img_alt:"Nail Design "+i,
  				priority: 1
  			}
  		);
  	}// end of for insert images
  	// count the images!
  	console.log("STARTUP: inserted in nail design -  "+DesignImages.find().count());
  }
  });// end of if have no images

// publish read access to collections

// all visible ideas
Meteor.publish("ideas", function(){
  return Ideas.find();
});

// all visible design images
Meteor.publish("designImages", function(){
  return DesignImages.find({}, { sort: { priority: 1 }
                                });
});

//publish sections
Meteor.publish('sections', function(){
  return Sections.find();
});
