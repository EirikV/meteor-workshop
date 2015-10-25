# Meteor Chat

Welcome to this Meteor workshop made for BEKK. In this part you are going to build a chat application starting with nothing at all (except for this, very helpful readme). As you move through the tasks, you will learn about Meteor's basic concepts, and when you are done, you will be ready for more advanced Meteor tasks.

So how is this chat application going to look like? Well, head over to a fully operational death star, ummm I mean chat application, over at [meteor.com](http://bekkchat.meteor.com) and check it out. Feel free chat with the other participants throughout the day.

## Some resources to help you along
* **[The full Meteor documentation](http://docs.meteor.com/#/full/quickstart)**
* **[Style guide for the chat app](chat-app/client/css/)**
* **[Meteor's Todo tutorial using Blaze](https://www.meteor.com/tutorials/blaze/creating-an-app)**

## Let's get to work!
If you have any questions at this point, now is a great time to ask them - we will be happy to clarify any obscurities.

### First things first
Open your favorite command line and make sure that your current working directory is where you want to create your app. Then type: `meteor create chat-app`.

Then try running it by typing `meteor` - just to see that it works. Does it work? If yes, great! If no, shout out!

### Displaying some messages
Time to dig into some code. We're gonna start off by looking at displaying some data, messages to be exact. Open *chat-app.html* and create a template for a message. A message should have properties for author, text and time.

*Tip 1: use the markup from the [styleguide](chat-app/client/css/).*

*Tip 2: you can create a helper function for your message in *chat-app.js to format the time property of a message.*

*Tip 3: template helpers has to run on the client only, so wrap your client code in an if-statement: `if(Meteor.isClient)`*

Great, now you have a template to display a single message. But in a chat application, you of course need to display several messages. So let's create another template that will hold all messages as well as the textarea for adding new messages (more on adding a message later) - a *MessageContainer* if you will;

*Tip: grab the markup from the base structure in the [styleguide](chat-app/client/css/).*

This template will need to iterate over some messages, so you will need to use a block helper. Also, the messages will need to come from somewhere. For now, create a template helper function in *chat-app.js* for your *MessageContainer* that just returns an array with some dummy messages. 

*Tip: remember to put your client code in an if: `if(Meteor.isClient)`*

### Do something a litte more useful
Allright! You now have a basis for displaying some messages, but you are just returning a static array - that's not very useful now is it? Time to store messages in the database.

Open *chat-app.js* and create a new Mongo.Collection for your messages and store it in a global variable. Remember that this object has to be available on both the server AND the client, so don't put it in any `if(Meteor.isClient)` or `if(Meteor.isServer` blocks.

Now replace the static array in your template helper to return all messages.

*Tip: you can verify that things are working by manually adding messages via the console in your browser. Just type `Messages.insert({/*properties goes here*/)` (assuming you named your variable 'Messages'*

### Making adding messages a little simpler

Open up *chat-app.html* and add a textarea to your MessageContainer template. Then open *chat-app.js* and register an event handler on your template. Write code to insert a new message into the *Messages* collection here.

*Tip: If you use the 'keydown' event you can insert a message whenever the return key is hit*

### Publish and subscribe

Open up a new command line window and type `meteor remove autopublish`. Now things should be broken. But don't worry! A few lines of codes should fix it all up. Add code to publish all *Messages* inside your server code in chat-app.js (if you don't have an `if(Meteor.isServer)` block, now is the time to create one). Then, in your client code, add code to subscribe to your newly published collection.





















