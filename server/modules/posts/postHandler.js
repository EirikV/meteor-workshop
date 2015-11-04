var PostHandler = function () {

    var filterTags = function (text) {

        var tags = _.filter(text.split(' '), function (str) {
            return str.charAt(0) === '#';
        });

        return _.map(tags, function (str) {
            return str.replace(/[^A-Za-z0-9æøåÆØÅ]*/gi, '');
        });
    };

    var instagramFromTags = function (tag) {
        return Tweeteor.instagram.getImage(tag);
    };

    var addNew = function (text) {
        if (!text || !text.trim()) {
            throw new Meteor.Error('Empty post');
        }
        var tags = filterTags(text);
        var id = Posts.insert({
            text: text,
            createdAt: new Date(),
            userId: Meteor.userId(),
            tags: tags
        });
        _.each(tags, function (tag) {
            var tag = instagramFromTags(tag);
            tag.postId = id;
            Tags.insert(tag);
        });
    };
    return {
        add: addNew
    };

};

Tweeteor.postHandler = new PostHandler();