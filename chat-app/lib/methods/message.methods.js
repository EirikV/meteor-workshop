Meteor.methods({
    addMessage: function(text, user) {
        Messages.insert({
            text: text,
            timestamp: new Date(),
            user: user.firstname + ' ' + user.lastname                
        });        
    }
});