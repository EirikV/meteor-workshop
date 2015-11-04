var maxPostLength = 140;
var characters = new ReactiveVar(0);

var getFormValue = function (e) {
    var data = $(e.currentTarget).serializeArray();
    return _.pluck(data, 'value')[0];
};

var addPost = function (text, e) {
    $(e.currentTarget).find('textarea').val('');

    Meteor.call('addPost', text, function (error) {
        if (error) {
            Notification.error('Oh no! Your post was not created.');
        }
    });
}

Template.newPost.events({
    'submit form': function (e) {
        e.preventDefault();

        characters.set(0);
        addPost(getFormValue(e), e);
    },

    'keyup .tweet': function (e) {
        characters.set($(e.target).val().length);
    }
});

Template.newPost.helpers({
    getCharactersText: function () {

        if (characters.get() <= maxPostLength) {
            return (maxPostLength - characters.get()) + ' characters left';
        } else {
            return 'NO!'
        }
    }
});