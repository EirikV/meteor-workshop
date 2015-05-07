(function() {

    var Instagram = function(){

           var fetchImages = function(tag, callback) {
               if(!tag) {
                   throw new Meteor.Error('Tag is empty');
               }

               InstagramFetcher.fetchImages.fromTag({tagName: tag}, function(images) {
                   callback(null, randomImage(images, tag));
               });
           };

           var randomImage = function(images, tag){
               var random = Math.round(Math.random() * images.length);
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


})();
