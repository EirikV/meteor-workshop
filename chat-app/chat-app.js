Messages = new Mongo.Collection('Messages');
Users = new Mongo.Collection('Users');

var createUser = function() { 
    var firstname = [
        'Captain',
        'Jane',
        'John',
        'Ola',
        'Miss.',
        'Mr.',
        'Doctor',
        'Mrs.',
        'Sir.'
    ];

    var lastname = [
        'NoName',
        'Nameless',
        'JohnDoe',
        'Nordmann',
        'HazNoName',
        'QuestionMark'
    ];        

    return {
        firstname: firstname[Math.round(Math.random()*(firstname.length-1))],
        lastname: lastname[Math.round(Math.random()*(lastname.length-1))] 
    }
};

if (Meteor.isClient) {
    Meteor.subscribe('messages');
    Meteor.subscribe('users');

    Template.MessageContainer.helpers({
        messages: function() {
            return Messages.find({});
        }
    });

    Template.MessageContainer.events({
        'keydown textarea': function(e) {
            if(!(e.which === 13 && !e.shiftKey)) return;
            Meteor.call('addMessage', $('textarea').val(), 'something', function(err) {
                if(!err) {
                    $('textarea').val('');
                }
            });
        }
    });

    Template.Message.helpers({
        date: function() {
            return this.timestamp.toLocaleDateString();
        }
    });

    Template.User.helpers({
        name: function() {
            return this.firstname + this.lastname;
        }
    });

    Template.UserContainer.helpers({
        users: function() {
            return Users.find({});
        }
    });
}

if (Meteor.isServer) {
    Meteor.publish('messages', function() {
        return Messages.find({});
    });


    Meteor.publish('users', function() {
        return Users.find({});
    });

    Meteor.startup(function() {
        if(Messages.find({}).count() === 0) {
            Messages.insert({ text: 'This is a message', timestamp: new Date(), user: 'kjohann'});
            Messages.insert({ text: 'This is a another message', timestamp: new Date(), user: 'someone'});
        }    
    });
}


Meteor.methods({
    addMessage: function(text, user) {
        Messages.insert({
            text: text,
            timestamp: new Date(),
            user: user                
        });        
    }
});