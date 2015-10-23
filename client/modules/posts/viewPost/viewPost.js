var post;
var activeText = new ReactiveVar('');

Template.viewPost.helpers({
	getUser: function(userId) {
		var user = Meteor.users.findOne(userId);
		if(!user) return;
		return {
			username: user.username,
			profile: user.profile
		};
	},
	fetchText: function() {
		var activeTextValue = activeText.get();
		return activeTextValue && this._id === post._id ? activeTextValue : this.text;
	}

});

Template.viewPost.events({
	'mouseenter .post': function(e) {
		if(!this.text){
			return;
		}
		post = this;
	},

	'mouseleave .post': function(e) {
		post = undefined;
	},

	'mouseenter .tag a': function(e) {
		if(!post) { 
			return;
		}
		activeText.set(post.text.replace(new RegExp('#' + this.tag, "g"), '<span class="active-tag">#' + this.tag + '</span>'));
	},

	'mouseleave .tag a': function(e) {
		activeText.set(post.text);
	}
});
