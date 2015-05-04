Meteor.methods({

  addNewPost: function (text) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Post.add({
        text: text,
        createdAt: new Date(),
        user: {
            name: Meteor.user().username,
            id: Meteor.userId()
        }
    });

  }

});