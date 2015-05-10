var getFormValue = function(e) {
    var data = $(e.currentTarget).serializeArray();
    return _.pluck(data, "value")[0];
};

Template.newPost.events({
	'submit form': function(e) {
	    e.preventDefault();

	    var text = getFormValue(e);
        
        
        Meteor.call("addPost", text, function(error, result) {
            if(!error) {
                $(e.currentTarget).find('textarea').val('');
            } else {
                Notification.error('Oh no! Your post was not created.');
            }
        });
	}
});


