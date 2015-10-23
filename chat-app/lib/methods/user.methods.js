var createUser = function() { 
    var firstname = [
        'Anonymous',
        'Random',
        'Unidentified',
        'Nameless',
        'Unnamed',
        'Unknown',
        'Incognito'
    ];

    var lastname = [
        'Sheep',
        'Badger',
        'Elephant',
        'Tiger',
        'Dog',
        'Wolf',
        'Cat',
        'Turtle',
        'Shark',
        'Dolphin',
        'Cow',
        'Hamster',
        'Giraffe',
        'Lion'
    ];        

    return {
        firstname: firstname[Math.round(Math.random()*(firstname.length-1))],
        lastname: lastname[Math.round(Math.random()*(lastname.length-1))] 
    }
};

Meteor.methods({
    addUser: function() {
        var user = createUser();
        var count = Users.find({firstname: user.firstname, lastname: {$regex: '^' + user.lastname}}).count({});
        var lastname = count > 0 ? user.lastname + count : user.lastname;
        var inserted = Users.insert({
            firstname: user.firstname,
            lastname: lastname,
            lastOnline: Date.now()
        });
        return Users.findOne(inserted);
    },
    setUserOnline: function(user) {
        Users.update(user._id, {$set: {lastOnline: Date.now()}});
    }
});