var getFormValue = function(e) {
    var data = $(e.currentTarget).serializeArray();
    return _.pluck(data, "value")[0];
};

Template.newPost.events({
	'submit form': function(e) {
	    e.preventDefault();

	    var data = getFormValue(e);

        Meteor.call("addNewPost", data, function(error, result) {
            if(!error) {
                $(e.currentTarget).find('textarea').val('');
            } else {
                Notification.error('Oh no! Your post was not created.');
            }
        });
	}

//    'keyup .tweet': function(e) {
//        e.preventDefault();
//
//        if(e.which !== 32) {
//            return;
//        }
//
//        var data = getFormValue(e);
//
//        Meteor.call("matchPostWithTags", data, function(error, result) {
//            console.log(error, result);
//        });
//    }

});


