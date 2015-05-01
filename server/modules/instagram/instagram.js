var instagram = (function(){

       var fetchImages = function(tag, callback) {
           if(!tag) {
               throw new Exception('Tag is empty');
           }

           InstagramFetcher.fetchImages.fromTag({tagName: tag}, function(images) {
               callback(null, randomImage(images));
           });
       };

       var randomImage = function(images){
           var random = Math.round(Math.random() * images.length);

           return images[random].images;
       };

        return {
            getImage: function(tag) {
                var async =  Meteor.wrapAsync(fetchImages, this);

                return async(tag);
        }
    }
});

Instagram = new instagram();