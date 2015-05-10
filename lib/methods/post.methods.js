Meteor.methods({
  addPost: function(text) {
    if(Meteor.isClient) {
      return;
    }
    if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
    }
    
    Tweeteor.postHandler.add(text);   
  }
});