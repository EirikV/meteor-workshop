var instagram = (function(){
    return {

        fetchImages: function(tag, callback) {
            if(!tag) {
                throw new Exception('Tag is empty');
            }

            var self = this;
            InstagramFetcher.fetchImages.fromTag({tagName: tag}, function(images) {
                callback(null, self.randomImage(images));
            });
        },

        randomImage: function(images){
            var random = Math.round(Math.random() * images.length);

            return images[random].images;
        },

        getImage: function(tag) {
            var async =  Meteor.wrapAsync(this.fetchImages, this);

            return async(tag);
        }


    }
});

Instagram = new instagram();