var getFormValue = function(e) {
    var data = $(e.currentTarget).serializeArray();
    return _.pluck(data, "value")[0];
};

var addPost = function(text, e) {
    if(Meteor.user().username === "Hodor") {
        text = text.replace(/[A-Za-z0-9æøåÆØÅ]+/gi, "HODOR");
    }
    Meteor.call("addPost", text, function(error, result) {
        if(!error) {
            $(e.currentTarget).find('textarea').val('');
        } else {
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


