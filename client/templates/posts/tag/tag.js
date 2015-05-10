Template.tag.helpers({
	tagError: function(error) {
	    if(error) {
	        return 'tag-forbidden';
        } else {
            return 'tag-not-found';
        }
	}
})