var post = (function() {

    var filterTags = function(text) {

        var tags = _.filter(text.split(' '), function(str){
            return str.charAt(0) === '#';
        });

        return _.map(tags, function(str) {
            return str.replace(/[^\w]*/gi, '');
        });
    };

    var instagramFromTags = function(tags) {
        return _.map(tags, function(tag) {
            return Instagram.getImage(tag);
        });
    };

    var addNew = function(post) {
         if(!post.text || !post.text.trim()){
             throw new Meteor.Error('Empty post');
         }

         _.extend(post, {
            tags: instagramFromTags(filterTags((post.text.trim())))
         });

         posts.insert(post);
     };

    return {
        add: addNew
    };

});

Post = new post();