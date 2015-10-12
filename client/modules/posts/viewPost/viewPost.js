var post = {};

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
		var activePost = Posts.findOne(Session.get('activePost'));
		if(activePost && activePost._id === this._id) {
			var activeText = Session.get('activeTagText');
			return activeText ? activeText : this.text;
		}
		return this.text;
	}

});

Template.viewPost.events({
	'mouseenter .post': function(e) {
		if(!this.text){
			return;
		}
		Session.set('activePost', this._id);
	},

	'mouseleave .post': function(e) {
		Session.delete('activePost');
	},

	'mouseenter .tag a': function(e) {
		var activePost = Posts.findOne(Session.get('activePost'));
		
		if(!activePost) { 
			return;
		}

		var markup = activePost.text.replace(new RegExp('#' + this.tag, "g"), '<span class="active-tag">#' + this.tag + '</span>');
		Session.set('activeTagText', markup);
	},

	'mouseleave .tag a': function(e) {
		Session.delete('activeTagText');
	}
});
