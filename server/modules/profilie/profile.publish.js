Meteor.publish("profile", function(username) {
	var user = Meteor.users.findOne({username: username});
	
	if(!user) {
		this.ready();
		return;
	}
	
	return Meteor.users.find(user._id, {
		fields:{"username": 1, "profile": 1}
	});
});

Meteor.publish("images", function(){ 
	return Images.find(); 
});