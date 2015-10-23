Messages = new Mongo.Collection('Messages');

if (Meteor.isClient) {
    Template.MessageList.helpers({
        messages: function() {
            return Messages.find({});
        }
    });
    Template.Message.helpers({
        date: function() {
            return this.timestamp.toLocaleDateString();
        }
    })
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        if(Messages.find({}).count({}) === 0) {
            Messages.insert({ text: 'This is a message', timestamp: new Date(), user: 'kjohann'});
            Messages.insert({ text: 'This is a another message', timestamp: new Date(), user: 'someone'});
        }    
    });
}
