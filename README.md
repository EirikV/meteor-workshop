# Tweeteor
Welcome to this Meteor workshop made for BEKK. This is the second part of the workshop, so if you haven't completed the [first part](https://github.com/EirikV/meteor-workshop/tree/chat-solution) yet, we strongly recommend that you do.

In this part you are jumping into some existing code for a social microblog application called Tweeteor. Tweeteor revolutionizes the way social microblogs work by fetching random images from Instagram that matches your hashtags. Wonder how it looks? Go [check it out](http://therealtweeteor.meteor.com/). Feel free to create an account and write some tweets.

## Some resources to help you along
* **[The full Meteor documentation](http://docs.meteor.com/#/full/quickstart)**
* **[Atmospherejs.com - meteor packages](https://atmospherejs.com/)**
* **[The iron router guide](http://iron-meteor.github.io/iron-router/)**
* **[Collection FS github page (used for image upload)](https://github.com/CollectionFS/Meteor-CollectionFS)**
* **[Meteorpad - jsfiddle for Meteor](http://meteorpad.com)**

## Tasks

### 1. Structure
This application is quite a lot bigger than the [chat application](https://github.com/EirikV/meteor-workshop/tree/chat-solution), so we have chosen to structure it into smaller files and folders. Structuring a larger Meteor app can be achieved by using packages, but that falls outside the scope of this workshop. 

You should familiarize yourself with how the application is built. Poke around in the code, and don't hesitate to ask if things are unclear!. 

The application has the following structure (as per Meteor's own [recommendations](http://docs.meteor.com/#/full/structuringyourapp):

* **client** (main folder for client side only code)
    * common (holds common code such as global helpers)
    * less
    * modules (each logical piece of the application is treated like a module)
        * <module>
            * <root_level.html or .js>
            * <submodule folder>
                * <submodule .html or .js>
* **lib** (main folder for code shared between client and server)
* **public** (assets)
* **server** (main folder for server side only code)
    * modules (client side modules can have server side counterparts)
        * <submodule>
            * <submodule.js>

### 2. Routing
The most popular router for Meteor the `iron:router` ([iron router on atmospherejs](https://atmospherejs.com/iron/router)). Using a router is essential for a large application. With Meteor, using a router changes some of the basic mechanics of the framework. For example: In the chat application, you can simply publish a collection and then subscribe to it from the client. With a router, this needs to be handled for each route to make sure that a subscription is ready once a route function is executed. In the next series of subtasks, you will learn the parts of iron:router that are needed for Tweeteor.

#### Registering a route
Tweeteor requires two routes. One root route that shows posts and one route for the profile page. Open up `router.js` and add these two routes. The profile route should use a parameter that is unique for each user, the username for instance.

Create a data function for both routes. For now, let them just return a predefined set of data so that you can verify that they work.

*__Tip:__ Iron router looks for templates that have the same as you routes*

*__Tip:__ Look at the templates provided for posts and profile. Add some temporary code here to display the dummy data you put in the data function of your routes*

#### Layout
Tweeteor is supposed to have a header on each page, but it doesn't have this just yet. Let's fix this by using the layout we have provided. If you open `layout.html` you can see that this file has some default markup. 

To use the layout in your router, open `router.js` and create a `Router.configure` function that takes in an object. Add a `layoutTemplate` property on this object with a string that matches the name of the layout template in `layout.html`. 

To wrap it all up you need to tell the router where to render the template. Using spacebar's [inclusion-tag](https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md#inclusion-and-block-arguments) with `yield` as name does the trick.

#### 404 - header not found
Iron router can of course show a custom 404 page for unknown routes. All you need to do is to use your `Router.configure` function to tell it where to find the `notFoundTemplate`. You can also show a custom `dataNotFound` page through the use of a `plugin`. Make your app a little more friendly by adding both of these.

### 3. Accounts
A true social microblog should have the ability to allow users to register and log in. Luckily, you don't have to build this functionality from scratch. Meteor has a series of packages with the prefix `accounts` that handle user registration and authentication for you. With just a few keystrokes you can get authentication through Facebook, Twitter, Github and others.

Tweeteor will use simple authentication where users signs up with Tweeteor directly (but feel free to try out the accounts packages for Facebook etc.). So open up a command line and type the following commands

* `meteor add accounts-password` 
* `meteor add accounts-ui` 

The first package is for the authentication and user handling. The other gives you a simple UI for sign in and registration.

The `accounts-ui` package comes with a predefined template called `loginButtons`. This is basically all you need to get a fully functional accounts system in the app. By default, you will get login by email and no username. To change this, create a .js file somewhere in your client code (maybe in the profile module?) and use `Accounts.ui.config` to swicht this with `'USERNAME_AND_OPTIONAL_EMAIL'` instead.

*__Tip:__ Check out the documentation for the accounts packages. Meteor Accounts also has a [project page](https://www.meteor.com/accounts) on meteor.com*

*__Tip:__ Put your `loginButtons` in the actionBar.html file to get our custom style for the sign in link*

Now you can sign in, but when you do, the sign in link does not dissapear which is kind of strange. `Accounts-ui` comes with a handy global template helper, `{{currentUser}}` which holds the object representation of the current user. It wouldn't have been all that hard to write the helper yourself as it simply returns the result of `Meteor.user()`, but it's still kind of neat. With the `currentUser` helper, you should be able to hide the sign in link when a user is signed in.

Display the following markup when users have signed in to get a sign out button:

```html
<span class="glyphicon glyphicon-log-out"></span>
```

To get this button to actually do something, you have to create an event handler in `actonBar.js` that logs you out and redirects you to the homepage. Meteor can help with logging out using the `Meteor.logout` function, while iron:router has a function called `go` that takes in a route name that can help you accomplish the latter.

### 4. Profiles
In these tasks you will need to work with publishing users. The client will need to subscribe to these. But, since Tweeteor uses a router, this has to be handled a little differently than in the [chat application](https://github.com/EirikV/meteor-workshop/tree/chat-solution).

Both the `route` function and the global `Router.configure` function supports an object property called `waitOn`. This is a function that can be used to set up route specific subscriptions (when used in a `route` call) and global subscriptions (when used in the `Router.configure` function). Either return a single `Meteor.subscribe` or an array of multiple subscriptions. If you want, you can add a loadingTemplate that will be displayed until the subscription is ready. 

#### Basic information
Now that users can sign in, they should be able to do something with their own profiles. As you can see, we have chosen to not hand out names for our users this time. However, this is something you should change. Open `profile.html` and create fields for the users profile. Examples of fields that you can include are: firstname, lastname, adress and phone. Since it looks kind of weird when you first sign in and don't have a name, feel free to use the function we provided in the [chat-application](https://github.com/EirikV/meteor-workshop/tree/chat-solution) to hand out a temporary name as users sign in.

*__Tip:__ Remember to subscribe to profiles (which also need to be published) through a `waitOn` call in `router.js`. Profiles should be available in all routes, so this should be done globally. Publishing from the `Meteor.users` collection is a little different than other collections. You have to add the fields `username` and `profile` like this: `Meteor.users.find({},{fields: 'username': 1, 'profile': 1}});`*

*__Tip:__ There are several ways to set a temporary name for a user on login. One is to use the [accountsServer.onCreateUser](http://docs.meteor.com/#/full/accounts_oncreateuser) event. Another, which is what we have done in the solution, is to utilize a helper that returns a name if present, and creates one through a `Meteor.method` if not.*

To be able to utilize the form you have made in profile.html, you must create an event handler to intercept the submit event of the form in `profile.js`. Then, create a method to update the `profile` property of a user.

To update this field with an object, you need to use some more 'advanced' MongoDB features than just calling insert. The update function is what you need. To update a document in a collectionyou can do something like this: `YourCollection.update(id, {$set: {'somefield': 42, 'object.someValue': 1337}});`

#### Profile picture
Users of Tweeteor now have the freedom to edit their own information. However, they lack identidy. So let's give them the ability to upload a profile picture.

To do this, you need to add a fileupload in `profile.html` and a new event handler in `profile.js`. However, before you can make this event handler do anything useful, you need to add two packages: `cfs:standard-package`* and `cfs:gridfs`. These give you access to the `FS` object. This provides everything you need to process files, create a collection and manage an image store.

**Creating a store and a collection:** An Image collection should be created in the `Collections` folder. With the `cfs:gridfs` package, you can use Meteor's default MongoDB to store images. Check out an example [here](https://atmospherejs.com/cfs/gridfs) (you won't need to provide other parameters to the store constructor than a name). When you have created your `Images` collection, you should add the following code in the same file:

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

**Handling file input:** Using `FS.Utility.eachFile(event, function(file){/*process here*/})`, you can easily insert images into your collection.

*__Tip:__ remember to publish the images collection and subscribe to it through a global `waitOn` function.*

When you have created the functionality for uploading an image, we recommend that you create a global helper that fetches an image based on an imageID (the imageID should probalby be saved to the user's profile property). This global helper will be useful for displaying profile pictures.

#### Security
Profiles can be edited by anyone, which obviously isn't good. Add functionality that displays input elements only if the 'username' part of you profile route matches the username of the current user.

*__Tip:__ To get the current user in code, use `Meteor.user()`*

*__Tip:__ To test that it actually works, create two accounts and see that you can only edit the one you are signed in as.*

### 5. Posts
Allright! You should now be ready to tackle the biggest task on your own. Training wheels are off. Your task is to create the same `posts` functionality as we got on [The Real Tweeteor](http://therealtweeteor.meteor.com/).

#### A little help
There are a couple of things you need to do before tackling this task:

**Instagram:** Head over to [instagram](https://instagram.com/developer/) and create an account* if you don't have one already. Next, click "Register Your Application" and then "Register a New Client", to register a new client. Pop your `CLIENT ID` and `CLIENT SECRET` into settings.json (found in the root of the project).

*If you don't want to create an Instagram account, you may use our API keys instead.

We do this because instagram has a 5000-requests an hour per application limit for applications where the user is not authenticated.

**Running the app:** Up until now you have been running your apps using `meteor` in the terminal. Since we now are dependent on settings.json to load with our application, you need to run the app using `meteor --settings settings.json`. We have supplied a dev.sh to make it easier for you. For you Windows users, there is also a dev.bat. Our pleasure!

**The Instagram fetcher:** We have created the code that actually fetch a random image from Instagram for you. You can find it in the `instagram` folder under `server\modules`. The main part is actually a package called [krstffr:instagram-fetcher](https://atmospherejs.com/krstffr/instagram-fetcher). It is not, however, added as a package. This is because we have made some small alterations regarding error handling. 

We have exposed the `Instagram` object on the global `Tweeteor` object. All you will need is to use the `getImage` function to get an image representing a single tag. 

The Instagram fetcher can only run on the server.

*__Tip:__ Start by creating one or two (or even more?) collections for you posts. Storing tags in a separate collection might not be a bad idea. Remember to subscribe and wait!*

*__Tip:__ Underscore is available by default on the global scope, so if you need to do some filtering and such, feel free to use it.*

*__Tip:__ Get simple posts working first. For simplicity, there is no need to involve Instagram in the beginning. But when you do, it might be a good idea to drop all posts in your database to start with fresh data.*

*__Tip:__ You will need to extract tags from tweets. If you have a #hashtag you can use the following code to strip away anything besides the text: `str.replace(/[^A-Za-z0-9æøåÆØÅ]*/gi, '')`. Running a string '#hashtag.' thorugh this gives 'hashtag' as output.*

*__Tip:__ *To make the username under each post clickable, there is a helper supplied by Iron router called *linkTo* which is very useful*

*__Tip:__ To enable highlighting of hashtags on hover on the images, you might find the package reactive-var useful, but not neccessarily! This task may prove more difficult than it sounds by the way*

*__Tip:__ Remember that Meteor collections are reactive data sources. Anything in the DOM that should render automatically will probably be easiest to solve using reactive data sources.*

*__Tip:__ If you need a template helper multiple files it might be a good idea to create a global helper instead to reuse code.*

*__Tip__: Consult the various less files and look at the html source on [The Real Tweeteor](http://therealtweeteor.meteor.com/) to see how html elements should be structured and what classes you need to make it look sweet (or style it your self of course)*

### 6. Done?
Congratulations on finishing this workshop. Hope you had a blast trying Meteor. We would really like to get some feedback, so we hope that you take the time to [give it](https://fagdag.bekk.no/#28) :)

There are numerous extra features you can try to make using stuff we haven't covered:

* Create a tag cloud. Try to create one as a package that can be used by other applications as well. 
* Allow users to edit and delete their posts.
* Integrate the chat application as it's own separate part of Tweeteor by adding it as one or more packages.
* Or maybe you would like too feel the difference between using Meteor and a "normal" Node.js project? Try creating the chat-application using your favorite Node.js web application framework instead!



