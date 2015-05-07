(function(){

    var PostHandler = function() {

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
                return Tweeteor.instagram.getImage(tag);
            });
        };

        var addNew = function(post) {
             if(!post.text || !post.text.trim()){
                 throw new Meteor.Error('Empty post');
             }

             post = matchWithTags(post);

             Posts.insert(post);
         };

         var matchWithTags = function(post) {
              if(!post.text || !post.text.trim()){
                  return;
              }

             return _.extend(post, {
                tags: instagramFromTags(filterTags((post.text.trim())))
             });
         }

        return {
            add: addNew,
            matchTags: matchWithTags
        };

    };

    Tweeteor.postHandler = new PostHandler();

})();