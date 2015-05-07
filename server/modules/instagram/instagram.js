(function() {

    var Instagram = function(){

           var fetchImages = function(tag, callback) {
               if(!tag) {
                   throw new Meteor.Error('Tag is empty');
               }

               InstagramFetcher.fetchImages.fromTag({tagName: tag}, function(images) {
                   callback(null, randomImage(images));
               });
           };

           var randomImage = function(images){
               var random = Math.round(Math.random() * images.length);

               return images[random].images;
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
