Meteor.methods({

  addNewPost: function (text) {
    if(Meteor.isClient) {
      return;
    }

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tweeteor.postHandler.add({
        text: text,
        createdAt: new Date(),
        userId: Meteor.userId()
    });

  },

  matchPostWithTags: function(text) {
    if(Meteor.isClient) {
        return;
    }

    return Tweeteor.postHandler.matchTags({
        text: text
    });
  }

});