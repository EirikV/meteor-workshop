var post;
var activeText = new ReactiveVar('');

Template.viewPost.helpers({
    getUser: function (userId) {
        var user = Meteor.users.findOne(userId);
        if (!user) {
            return;
        }
        return {
            username: user.username,
            profile: user.profile
        };
    },
    fetchText: function () {
        var activeTextValue = activeText.get();
        var text = activeTextValue && post && this._id === post._id ? activeTextValue : this.text;
        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
        return new Handlebars.SafeString(text);
    }

});

Template.viewPost.events({
    'mouseenter .post': function () {
        if (!this.text) {
            return;
        }
        post = this;
    },

    'mouseleave .post': function () {
        post = undefined;
    },

    'mouseenter .tag a': function () {
        if (!post) {
            return;
        }
        activeText.set(post.text.replace(new RegExp('#' + this.tag, 'g'), '<span class="active-tag">#' + this.tag + '</span>'));
    },

    'mouseleave .tag a': function () {
        if(!post) {
            return;
        }

        activeText.set(post.text);
    },

    'click .tag a': function () {
        activeText.set(post.text);
    }
});