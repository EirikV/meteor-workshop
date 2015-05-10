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
		//Maybe get the tag from a separate collection?
	}
})