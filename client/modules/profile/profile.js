Template.editProfile.events({
    'submit .profile-form': function (e) {

        e.preventDefault();
        var data = $('form.profile-form').serializeArray();

        var profileInfo = _.object(_.pluck(data, 'name'), _.pluck(data, 'value'));

        Meteor.call('updateUserProfile', profileInfo, function (error) {
            delete Session.keys['nameChange'];

            if (error) {
                Notifications.error(error.error);
            } else {
                Notifications.success('Successfully updated profile :)')
            }
        });
    },
    'keyup input': function (e) {
        var id = $(e.currentTarget).attr('name');

        if (id === 'firstname' || id === 'lastname') {
            var name = $('input[name="firstname"]').val() + ' ' + $('input[name="lastname"]').val();
            Session.set('nameChange', name);
        }
    },
    'change .upload-profile-pic-input': function (event) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    Notifications.error('Error uploading image :(');
                } else {
                    Meteor.call('updateProfileImage', fileObj._id);
                }
            });
        });
    }
});

Template.editProfile.helpers({
    displayClass: function (editPermissions) {
        return editPermissions ? 'edit' : 'read-only';
    }
});
