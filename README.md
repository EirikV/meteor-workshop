# Tweeteor
Welcome to this Meteor workshop made for BEKK. This is the second part of the workshop, so if you haven't completed the [first part](https://github.com/EirikV/meteor-workshop/tree/chat-solution) yet, we strongly recommend that you do.

In this part you are jumping into some existing code for a social microblog application called Tweeteor. Tweeteor revolutionizes the way social microblogs work by fetching random images from Instagram that matches your hashtags. Wonder how it looks like? Go [check it out](http://therealtweeteor.meteor.com/). Feel free to create an account and write some tweets.

## Some resources to help you along
* **[The full Meteor documentation](http://docs.meteor.com/#/full/quickstart)**
* **[Atmospherejs.com - meteor packages](https://atmospherejs.com/)**
* **[The iron router guide](http://iron-meteor.github.io/iron-router/)**
* **[Collection FS github page (used for image upload)](https://github.com/CollectionFS/Meteor-CollectionFS)**

### Tasks

####1. Structure
This application is quite a lot bigger than the [chat application](https://github.com/EirikV/meteor-workshop/tree/chat-solution), so we have chosen to structure it into smaller files and folders. Structuring a larger Meteor app can be achieved using packages, but that falls outside the scope of this workshop. 

You should familiarize yourself with how the application is built. Poke a little around in the code, and don't hesitate to ask if some things are unclear!. 

The application is built using the following structure:

* client (main folder for client side only code).
    * common (holds common code such as global helpers)
    * less
    * modules (each logical piece of the application is treated like a module)
        * some module
            * some_root_level.html or .js
            * some submodule folder
                * some submodule .html or .js
* lib (main folder for code shared between client and server).
    * It may seem a little strange that the 'lib' folder doesn't actually contain any external libraries. We have named this folder lib as per Meteor's own [recommendations](http://docs.meteor.com/#/full/structuringyourapp) for structuring an app.
* public (assets).
* server (main folder for server side only code).
    * modules (some of the client side modules also have server side counter parts. Others exist only on the server).
        * some submodule
            * some submodule .js
####2. Routing
Meteor applications mostly use one package for routing: the [iron:router](https://atmospherejs.com/iron/router). Using a router is essential for a larger application. With Meteor, using a router changes some of the basic mechanics of the framework. For example: In the chat application, you simply published a collection and then subscribed to it from the client. With a router, this needs to be handled for each route to make sure that a subscription is ready once a route function is executed. In the next series of subtasks, you will learn the parts of iron:router that are needed for Tweeteor.

##### Registering a route
Tweeteor requires two routes. One root route that shows posts and one route for the profile page. Open up *router.js* and add these two routes. The profile route should use a parameter that is unique for each user, the username for instance.

Create a data function for both routes that for now just return a predefined set of data so that you can verify that your routes work.

*Tip: Iron router looks for templates named the same as you routes*

*Tip: Look at the templates provided for posts and profile. Add some temporary code here to display the dummy data you put in the data function of your routes*

##### Layout
Right now, your app probably doesn't look to good. Let's fix this by using the layout we have provided. If you open *layout.html* you can see that this file has some default markup. 

To use this layout in your router, open *router.js* and create a *Router.configure* function that takes in an object. Add a *layoutTemplate* property on this object with a string that matches the name of the layout template in *layout.html*. 

To wrap it all up you need to tell the router where to *yield* the template rendered in the route function. Adding the special template function {{> yield}} does the trick.

##### Handling data from subscriptions
In later tasks you will add some collections to the application that you will publish from the server. The client will need to subscribe to these. But, since Tweeteor uses a router, this has to be handled a little differently than in the [chat application](https://github.com/EirikV/meteor-workshop/tree/chat-solution).

Both the *render* function and the global *Router.configure* function supports an object property called *waitOn*. This is a function that can be used to set up route specific subscriptions (when used in a *render* call) og global subscriptions (when used in the *Router.configure* function). Either return a single *Meteor.subscribe* or an array of multiple subscriptions. If you want, you can add a loadingTemplate that will be displayed until the subscription is ready (optional for Tweeteor, you really don't have to do this). Subscriptions aren't needed right now, but we will remind you when the time comes.

####3. Accounts
A true social microblog needs to have authenticated users. Luckily, you don't have to build this functionality yourself. Meteor has a series of packages with the prefix *accounts* that handle user registration and authentication for you. With just a few keystrokes you can authentication through Facebook, Twitter, Github and others.

Tweeteor will use simple authentication where users signs up with Tweeteor directly (but feel free to try out the accounts packages for Facebook etc.). So open up a command line and type `meteor add accounts-password` and `meteor add accounts-ui`. The first package is the actual authentication and user handler. The other gives you a simple UI for a signin and registration form.

The *accounts-ui* package comes with a predefined template called *loginButtons*. This is basically all you need to get a fully functional accounts system in the app. By default, you will get login by email and no username. To change this, create a .js file somewhere in your client code (maybe in the profile module?) and ùse `Accounts.ui.config` to use a username and (optional) email instead.

*Tip: Check out the documentation for the accounts packages. Meteor Accounts also has a [project page](https://www.meteor.com/accounts) on meteor.com*

*Tip: put your *loginButtons* in the actionBar.html file to get our custom style for the sign in link*

Now you can sign in, but when you do, the sign in link does not dissapear which is kind of strange. *Accounts-ui* comes with a handy global template helper function, `{{currentUser}}` which holds the object representation of the current user. It wouldn't have been all that hard to write the helper yourself as it simply returns the result of `Meteor.user()`, but it's still kind of handy. With the *currentUser* helper, you should be able to hide the sign in link when a user is signed in.

Display the following markup when users have signed in to get a sign out button:

```html
<span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>
```

To get this button to actually do something, you have to create an event handler in *actonBar.js* that logs you out and redirects you to the homepage. Meteor itself can help with the first using the `Meteor.logout` function, while iron:router has a function called *go* that takes in a route name that can help you accomplish the latter.

####4. Profiles
#####Basic information
Now that users can sign in, they should be able to do something with their own profiles. As you can see, we have chosen to not hand out names for our users this time. However, this is something you should change. Open *profile.html* and create fields for the users profile. These should include firstname, lastname, adress and phone. Since it looks kind of weird when you first sign in and don't have a name, feel free to use the function we provided in the [chat-application](https://github.com/EirikV/meteor-workshop/tree/chat-solution) to hand out a temporary name as users sign in.

*Tip: Remember to subscribe to profiles (which also need to be published) through a *waitOn* call in *router.js*. Profiles should be available in all routes, so this should be done globally. Publishing from the *Meteor.users* collection is a little different than other collections. You have to add the fields 'username' and 'profile' like this: `Meteor.users.find({fields: 'username': 1, 'profile': 1}});`*

*Tip: There are several ways to set a temporary name for a user on login. One is to use the [accountsServer.onCreateUser](http://docs.meteor.com/#/full/accounts_oncreateuser) event. Another, which is what we have done in the solution, is to utilize a helper that returns a name if present, and creates one if not.*

To be able to utilize the form you have made in profile.html, you mustcreate an event handler to intercept the submit event of the form in *profile.js*. Then, create a method to update the *profile* property of a user. The *Accounts* package has created a collection for you (*Meteor.users*), and by default, the *profile* field is possible to edit by a user. 

To update this field with an object, you need to use some more 'advanced' MongoDB features than just calling insert. The update function is what you need. To update a document in a collection called *SomeObjects* with a subproperty, you can do something like this: `SomeObjects.update(id, {$set: {'subprop.somefield': 1337}});`

#####Profile picture
Users of Tweeteor now have the freedom to edit their own information. However, they lack identidy. So let's give them the ability to upload a profile picture.

To do this, you need to add a fileupload in *profile.html* and a new event handler in *profile.js*. However, before you can make this event handler do anything useful, you need to add two packages: *cfs:standard-packages* and *cfs:gridfs*. These give you access to the *FS* object. This provides everything you need to process files, create a collection and manage an image store:

**Creating a store and a collection:** An Image collection should be created in the *Collections* folder. With the *cfs:gridfs* package, you can use Meteor's default MongoDB to store images. Check out an example [here](https://atmospherejs.com/cfs/gridfs) (you won't need to provide other parameters to the store constructor than a name). When you have created your *Images* collection, you should add the following code in the same file:

```JavaScript
Images.deny({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    },
    download: function(){
        return false;
    }
 });

Images.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    download: function(){
        return true;
    }
});
```

**Handling file input:** Using `FS.Utility.eachFile(event, function(file){/*process here*/})`, you can easily insert images into you collection of *Images*.

*Tip: remember to publish the images collection and subscribe to it through a global *waitOn* function*

#####Security
Right now everyone can edit anyone's profiles, which obviously isn't good. Add functionality that displays input elements only if the 'username' part of you profile route matches the username of the current user.

*Tip: To get the current user in code, use `Meteor.user()`*






