var Instagram = function(){

       var fetchImages = function(tag, callback) {

           if(!tag) {
               throw new Meteor.Error('Tag is empty');
           }

           Tweeteor.instagramFetcher.fetchImages.fromTag({tagName: tag}, function(images, pages, error) {
              callback(null, randomImage(images, tag, error));
           });
       };

       var randomImage = function(images, tag, error){
           if(error || !images || !images.length) {
               return image = {
                    tag: tag,
                    error: error
               }
           }

          var random = Math.round(Math.random() * (images.length-1));
          var selected = images[random];

          return image = {
               imgs: selected.images,
               link: selected.link,
               tag: tag
          }

       };

       var getImage = function(tag) {
           var async =  Meteor.wrapAsync(fetchImages, this);

           return async(tag);
       };

        return {
            getImage: getImage
        };
};

Tweeteor.instagram = new Instagram();
