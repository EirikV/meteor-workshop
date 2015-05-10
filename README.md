# Tweeteor
### meteor-workshop

This is a workshop for JS-Platform at Bekk Consulting.

The objective is to learn about Meteor.js by building Tweeteor.
Tweeteor is a fun new micro-blog that combines your hashtags with instagram pictures.

[Meteor.js documentation](http://docs.meteor.com/#/full/)

## Tasks:

### 1. First of all

Head over to [instagram](https://instagram.com/developer/) and create an account if you don't have one already.
Next, click "Register Your Application" and then "Register a New Client", to register a new client.
Pop your `CLIENT ID` and `CLIENT SECRET` into **settings.json** (found in the root of the project).

We do this because instagram has a 5000-requests an hour per application limit for applications where the user is not authenticated.

A meteor application is usually runs by typing `meteor` in the terminal at the root of the application.
Since we are dependent on **settings.json** to load with our application, we have supplied a **dev.sh** to make it easier for you.
For you Windows users, there is also a **dev.bat**. Our pleasure!

### 2. Profile
1. We are going to take a look at meteors package system, [atmosphere](https://atmospherejs.com).
Head over there and get `accounts-password` and `accounts-ui` for your project.
Hint: It might be useful to have a look in **accountsConfig.js** after you have acquired the packages.

⋅⋅⋅So why do Meteor.js need a new packaging system? Why can't they just use npm or something?
⋅⋅⋅According to Meteor, this is because Meteor applications, and thereby packages have the ability to be isomorphic.

2. Once you've got accounts up and running, try to add some inputs to the profile page. This could, for example be, first- and lastname, address, and phone number.
At this point it would be awesome to test out template inclusion (`{{>profileFormField}}`).

⋅⋅⋅Templates in Meteor.js look like mustache or handlebars, but are not.
⋅⋅⋅Meteor.js uses its own Spacebars templating language inspired by mustache/handlebars.

3. In Meteor.js we get reactive programming out of the box.
So our next fun little task is to test out the session-object. Attempt to make the users first- and lastname in the profile page header change whilst the user is typing.
It might be useful to make a `templateHelper` for this task.

4. Meteor.js is bundled with MongoDB. There already exist a `users` collection with the accounts packages you added in step 1.
Now would be the time to update you `users` collection with the input that can be collected from the profile.
This would also be the time to check out **methods** in Meteor.

5. Here is a fun little step. Try build a helper to set the profile picture. This step is optional (if you are satisfied with the default dull gray anonymous user image)
Hint: Use the `image` collection for uploading the profile pictures.

### 3. Posts
Oh, yes! This is the big one, here is where the fun starts.

You are going to implement posts, all of saving, adding, and exctracting tags.
You are free to implement as you wish.
We have given you a head start by providing the styling and template files.

Hints:
- * **tag.html** & **tag.js** are just a proposal, you are free to make your own or customize it with your own structure.*
- *Fetching tags from instagram MUST TO BE ON THE SERVER, so the method for adding a post should at least have an `if(isServer)` or `if(isClient) { return; }`*


### 4. Bonus

Here are some bonus tasks that are not in the solution branch:

1. Make a tag-cloud and bundle it in a Meteor pacakage.

2. Attempt to fetch images from instagram while the user is typing.






