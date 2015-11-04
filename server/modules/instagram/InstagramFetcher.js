// Borrowed from Kristoffer Klintberg
// https://github.com/krstffr/meteor-instagram-fetcher/

var InstagramFetcherHandler = function () {

    var that = this;

    // Instead of using console.log() directly, here we have a
    // "global" option to turn loggin off
    that.hideLog = false;
    that.log = function (msg) {
        if (that.hideLog)
            return true;
        return console.log(msg);
    };

    // All handling of fetching of remote images
    that.fetchImages = {};

    // The defaulty way of getting images, called by most other methods
    that.fetchImages.defaultCb = function (url, cb, passedOptions) {

        check(cb, Function);

        // Make sure user has provided AUTH
        if (!that.checkAuth()) {
            cb([], null, 'Not authenticated');
            return;
        }

        var options = {
            params: {client_id: Meteor.settings.InstagramAPI.CLIENT_ID}
        };

        if (passedOptions.minTagId)
            options.params.min_tag_id = passedOptions.minTagId;

        if (passedOptions.maxTagId)
            options.params.max_tag_id = passedOptions.maxTagId;

        that.log('--> --> fetching images using these params:');
        that.log(options);

        Meteor.http.call(
            'GET',
            url,
            options, function (err, res) {

                if (err) {
                    cb(images, pagination, err);
                    return;
                }

                // Get the pagination
                var pagination = res.data.pagination;
                check(pagination, Object);

                // The images are stored in the data.data object
                // should be an array…
                var images = res.data.data;
                check(images, Array);

                that.log('--> --> --> returning: ' + images.length + ' images.');

                // …pass the array to the callback!
                cb(images, pagination);
            });

    };

    // Get image by tag (hashtag)
    that.fetchImages.fromTag = function (options, cb) {

        // Make sure we got a tagName!
        check(options.tagName, String);

        var url = 'https://api.instagram.com/v1/tags/' + options.tagName + '/media/recent?callback=?';

        that.log('--> --> fetching images with tag: ' + options.tagName + '…');

        return that.fetchImages.defaultCb(url, cb, options);

    };

    that.checkAuth = function () {

        that.log('--> InstagramFetcher.checkAuth()…');

        // Make sure there is a InstagramAPI object in settings
        if (!Meteor.settings.InstagramAPI) {
            that.log('No "InstagramAPI" in settings.');
            return false;
        }

        // Make sure user has provided client id and secret
        if (!Meteor.settings.InstagramAPI.CLIENT_ID) {
            that.log('No "InstagramAPI.CLIENT_ID" in settings.');
            return false;
        }

        if (!Meteor.settings.InstagramAPI.CLIENT_SECRET) {
            that.log('No "InstagramAPI.CLIENT_SECRET" in settings.');
            return false;
        }

        that.log('--> InstagramFetcher.checkAuth() DONE!');

        // If all is cool, return true
        return true;

    };

    that.init = function () {
        that.log('\n--> init InstagramFetcher…');
    };

    that.init();

};

Tweeteor.instagramFetcher = new InstagramFetcherHandler();
