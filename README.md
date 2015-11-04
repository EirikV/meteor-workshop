# Meteor Chat

Welcome to this Meteor workshop made for BEKK. In this part you are going to build a chat application starting with nothing at all (except for this very helpful readme). As you move through the tasks, you will learn about Meteor's basic concepts, and when you are done, you will be ready for more advanced Meteor tasks.

So what is this chat application going to look like? Well, head over to a fully operational death star... ummm... I mean chat application, at [bekk-chat](http://bekkchat.meteor.com) and check it out. Feel free chat with the other participants and ask questions throughout the day.

## Some resources to help you along
* **[The full Meteor documentation](http://docs.meteor.com/#/full/quickstart)**
* **[Style guide for the chat app](chat-app/client/css/)**
* **[Meteor's Todo tutorial using Blaze](https://www.meteor.com/tutorials/blaze/creating-an-app)**

## Let's get to work!

### 1. First things first
Open your favorite command line and make sure that your current working directory is where you want to create your app. Then type: `meteor create chat-app`.

Then try running it by typing `cd chat-app` and then `meteor` - just to see that it works. 

You can access the application on [localhost:3000](http://localhost:3000). Does it work? If yes, great! If no, shout out!

The demo application that Meteor generates when you create an app is not needed for this workshop, so delete the content of `chat-app.html` and `chat-app.js`.

### 2. Displaying some messages
Time to dig into some code. We're gonna start off by looking at displaying some data, messages to be exact. Open `chat-app.html` and create a template for a message. A message should have properties for author, text and time.

*__Tip:__ use the markup from the [style guide](chat-app/client/css/).*

*__Tip:__ you can create a helper function for your message in `chat-app.js` to format the time property of a message.*

*__Tip:__ template helper have to run on the client only, so wrap your client code in an if-statement: `if(Meteor.isClient)`.*

Great, now you have a template to display a single message. In a chat application you might, of course, need to display several messages. So let's create another template that will hold all messages as well as the textarea for adding new messages - a `MessageContainer` if you will (more on adding a message later).

*__Tip:__ grab the markup from the base structure in the [style guide](chat-app/client/css/).*

This template will need to iterate over some messages, so you will need to use a block helper. Also, the messages will need to come from somewhere. For now, create a template helper function in `chat-app.js` for your `MessageContainer` that just returns an array with some dummy messages. 

*__Tip:__ remember to put your client code in an `if(Meteor.isClient)`.*

### 3. Do something a litte more useful
Allright! You now have a basis for displaying some messages, but you are just returning a static array - that's not very useful, now is it? Time to store messages in the database.

Open `chat-app.js` and create a new `Mongo.Collection` for your messages and store it in a global variable. Remember that this object has to be available on both the server AND the client, so don't put it in any `if(Meteor.isClient)` or `if(Meteor.isServer)` blocks.

Now replace the static array in your template helper to return all messages instead (using a find query on the `Messages` -collection).

*__Tip:__ You can verify that things are working by manually adding messages via the console in your browser. Just type `Messages.insert({<properties goes here>})` (assuming you named your variable `Messages`. Since you haven't added the concept of users yet, just use some random value for that property.*

### 4. Making adding messages a little simpler

Open up `chat-app.html` and add a textarea to your `MessageContainer` template. Then open `chat-app.js` and register an event handler on your template. Write code to insert a new message into the `Messages` collection here. You can just hard code the `author` property for now.

*__Tip:__ If you use the `keydown` event you can insert a message whenever the return key is hit.*

### 5. Publish and subscribe

Open up a new command line window, change directory to your application folder and type `meteor remove autopublish`. 

Now things should be broken. But don't worry! A few lines of codes should fix it all up. Add code to publish all messages as server-side code in chat-app.js (if you don't have an `if(Meteor.isServer)` block, now is the time to create one). Then, in your client code, add code to subscribe to your newly published collection.

Verify that everything is working again.

### 6. Securing your application

Now that you got your app working again, it is time to break it once more. In the new command line window you opened earlier, type `meteor remove insecure`. 

Now try writing a message. Didn't work? Check the console in your browser - it should say 'access denied'.

To fix this, you need to create a `Meteor.method` for adding messages. So open up `chat-app.js` and add one. Then, replace the code in your textarea event handler with new code that calls this new method using `Meteor.call`.

*__Tip:__ You can have your method situated on the server only, but if you put it in the code that runs on both the server and the client, you will enable one of Meteor's coolest features: [latency compensation](http://docs.meteor.com/#/full/sevenprinciples)*.

### 7. Introducing users

Let's make the application a little more full of life. Add two new templates for users by the same pattern as you did for messages (one for a single user, and one 'Container' that iterates over many users). To verify that things work, you can create a template helper in your UserContainer that returns an array of objects that has the properties of a user. A user should have a name, either divided into a firstname and a lastname, or just a simple name that holds the full name.

Open `chat-app.js` and create a new `Mongo.Collection` for users. Remember to publish and subscribe it! Then make sure that there is a template helper for the UserContainer that returns all users from the database.

But wait! How can you check that things work now that you have removed the insecure package? Well, Meteor has its own database shell. Open a command line window and type `meteor mongo`. Now you can write normal MongoDb queries. To add users, simply type `db.users.insert({<properties goes here>})` (assuming you named the collection 'users'). While you're poking around the database, you might want to clean up old testdata. To delete all members of a collection, for instance the `messages` collection, simply type `db.messages.drop()`.

### 8. Creating users

We are keeping it simple in this tutorial, so we will take the liberty of choosing names for your users. To help you out in choosing a random name, here is some code you can paste into `chat-app.js`:

```JavaScript
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
```

To create a new user you will need a `Meteor.Method`, so go ahead and create one. Then you need to create a way to call it as the application is loading.

This can be accomplished through the use of a `Meteor.startup` function. This particular startup function should live on the client, so create it inside your `if(Meteor.isClient)` block.

### 9. Associate messages and users

Now that you have some users, it is time to set the current user as author whenever a message is written. To do this, you need to keep hold of the current user somehow. A `Session` variable is perfect for this.

Once again open `chat-app.js`. If you look at your `Method` for creating a user, this probably doesn't return anything. To be able to set the current user in a `Session` variable, you must retrieve the new user from the database after inserting, and then return this to the client.

*__Tip:__ When calling insert on a collection, the return value is the `_id` field of the newly created document. Put this into a findOne call to retrieve the newly created document from the database.*

*__Tip:__ Every `Meteor.call` function can take a callback as its second parameter. This callback has two parameters: error and result, where result is whatever the method returned.*

Once you have the newly created user available on the client, simply store it in a `Session` variable (with a suitable name of course). Then use this session variable to set the author property in your `Method` for adding a new message.

### 10. Highlighting yourself and your messages

Using the `Session` variable with the current user, you can also highlight what messages are yours and which user in the list of users is you.

In `chat-app.js` create a template helper for your `Message` template that returns either `'-current` or `''` based if the message's name matches or does not match the current user's name respectively. Now you can use this helper in the `Message` template's markup to add the `-current` class for your messages.

Create a similar helper for your `User` template and use it to highlight the current user in the list of users.

### All done!
Congratulations! You have now completed an introduction to Meteor. So what's next? If you feel done with the chat application, move on to [Tweeteor](https://github.com/EirikV/meteor-workshop/tree/tweeteor-solution) - a brand new social media site. Otherwise, here are some extra tasks for the chat app if you want to polish it.

1. The current user feature of the application hands you a new user each time you refresh the page. This isn't all that user friendly, so go ahead and fix it by introducing the use of localstorage to store the id of the current user. Then use this in your `Meteor.startup` function to ensure that you only get assigned a user once per browser.
2. As of now a lot of the users in the list are probably inactive. Make functionality that tracks when users were last active and use this to mark inactive users in the same way as shown in the [style guide](chat-app/client/css/). Also, sort the list of users so that the active users are at the top.
3. Users of the chat app all probably have the same feature request: being able to choose their own username. Give the people what they want!




















