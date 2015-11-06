Template.Message.helpers({
    date: function () {
        return this.timestamp.toLocaleDateString();
    },
    displayMode: function () {
        var currentUser = Session.get('currentUser');
        if (this.user === currentUser.firstname + ' ' + currentUser.lastname) {
            return '-current';
        }
        return '';
    },
    formattedText: function() {
        text = this.text.replace(/(\r\n|\n|\r)/gm, '<br>');
        return new Spacebars.SafeString(text);
    }
});