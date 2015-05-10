var post = {};

Template.viewPost.helpers({
	getUser: function(userId) {
		var user = Meteor.users.findOne(userId);
		if(!user) return;
		return {
			username: user.username,
			profile: user.profile
		};
	}

});

Template.viewPost.events({
	'mouseenter .post': function(e) {
		if(!this.text){
			return;
		}

		post = {
			target: e.currentTarget,
			text: this.text,
			markupText: this.text
		}

	},

	'mouseleave .post': function(e) {
		post = {};
	},

	'mouseenter .tag a': function(e) {
		if(!post.text){
			return;
		}

		post.markupText = post.text.replace(new RegExp('#' + this.tag, "g"), '<span class="active-tag">#' + this.tag + '</span>');
		$(post.target).find('.text').html(post.markupText);
	},

	'mouseleave .tag a': function(e) {
		$(post.target).find('.text').html(post.text);
		post.markupText = post.text;
	}
});
