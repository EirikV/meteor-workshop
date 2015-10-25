# Meteor Chat - Styleguide

This is just a helpful guide of how to structure the style your app.
You are, of course, free to style the application the way you choose.

You can grab the CSS [here](chat-app.css).

## Typogrpahy

Add this to your ```<head>``` tag to get styles for h1, h2, h3, and h4.

```html
<link href='https://fonts.googleapis.com/css?family=Amatic+SC' rel='stylesheet' type='text/css'>
```

## Colors

* Black: #464646
* White: #fff
* Off-white: #f1f1f1
* Gray: #ccc
* Highlights/Active (red-ish): #db4e4d
* Green: #008000

## Base structure

![Base structure](example-images/base-structure.png)

```html
<div class="app-container">
    <header class="header"><!-- Your title can go here --></header>

    <section class="content-container">

        <section class="message-container">

            <section class="messages">
                <!-- Add messeges in this section -->
            </section>

            <section class="post">
                <!-- Put your textarea/input here -->
            </section>

        </section>

        <section class="users">
            <!-- Show users here -->
        </section>

    </section>
</div>
```

## Post - Input

![Post-Input](example-images/textbox.png)

```html
<textarea name="post" placeholder="What's up?"></textarea>
```

## Messages

### Message

![Message](example-images/message.png)

```html
<div class="message">
    <div class="content">
        <div class="author">Barack Obama</div>
        <div class="text">This app is cool!</div>
        <div class="time">10.10.2014</div>
    </div>
</div>
```

### Message - Current user

![Message](example-images/message-current-user.png)

```html
<div class="message -current">
    <div class="content">
        <div class="author">Donald Trump</div>
        <div class="text">I agree, enjoy it very much!</div>
        <div class="time">10.10.2014</div>
    </div>
</div>
```

## Users

### User - Active

![User - Active](example-images/user-active.png)

```html
<div class="user">
    <div class="status -active"></div>
    <div class="name">Donald Trump</div>
</div>
```

### User - Inactive

![User - Inactive](example-images/user-inactive.png)

```html
<div class="user">
    <div class="status -inactive"></div>
    <div class="name">Donald Trump</div>
</div>
```

### User - Current user

![User - Offline](example-images/user-current.png)

```html
<div class="user -current">
    <div class="status -active"></div>
    <div class="name">Barack Obama</div>
</div>
```