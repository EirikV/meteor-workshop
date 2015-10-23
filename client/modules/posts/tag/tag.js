Template.tag.helpers({
	tagError: function(error) {
	    if(error) {
	        return 'tag-forbidden';
        } else {
            return 'tag-not-found';
        }
	},

	getTagId: function(tag){
		return tag._id;
	},

	fetchTag: function(tag, postId) {
		return Tags.findOne({postId: postId, tag: tag});
	}
});