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

Meteor.methods({
    addUser: function() {
        
        var user = createUser();
        var count = Users.find({firstname: user.firstname, lastname: {$regex: '^' + user.lastname}}).count({});
        var lastname = count > 0 ? user.lastname + count : user.lastname;
        var inserted = Users.insert({
            firstname: user.firstname,
            lastname: lastname
        });
        return Users.findOne(inserted);
    }
});