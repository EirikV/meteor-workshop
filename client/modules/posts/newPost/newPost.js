var getFormValue = function(e) {
    var data = $(e.currentTarget).serializeArray();
    return _.pluck(data, 'value')[0];
};

var addPost = function(text, e) {
    $(e.currentTarget).find('textarea').val('');
    Meteor.call('addPost', text, function(error, result) {               
        if(error) {
            Notification.error('Oh no! Your post was not created.');
        } 
    });
}

Template.newPost.events({
	'submit form': function(e) {
	    e.preventDefault();
        addPost(getFormValue(e), e);
	}
});


