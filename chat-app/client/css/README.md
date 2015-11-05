# Meteor Chat - Styleguide

This is just a helpful guide of how to structure the style your app.
You are, of course, free to style the application the way you choose.

You can grab the CSS [here](chat-app.css).

## Base structure

![Base structure](example-images/base-html-structure.png)

```html
<div class="app-container">
    <header class="header"><!-- Your title or logo can go here --></header>

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

### Logo

![Logo](example-images/logo.png)

```html
<a href="#" class="logo"></a>
```

## Post - Input

![Post-Input](example-images/textarea.png)

```html
<textarea name="post" placeholder="What's up?"></textarea>
```

## Messages

### Message

![Message](example-images/message-user.png)

```html
<div class="message">
    <div class="content">
        <div class="author">Barack Obama</div>
        <div class="text">This app is cool!</div>
        <div class="time">20/1/2009</div>
    </div>
</div>
```

### Message - Current user

![Message](example-images/message-user-current.png)

```html
<div class="message -current">
    <div class="content">
        <div class="author">Donald Trump</div>
        <div class="text">I also enjoy it very much!</div>
        <div class="time">12/12/2014</div>
    </div>
</div>
```

## Users

### User - Active

![User - Active](example-images/active-user.png)

```html
<div class="user">
    <div class="status -active"></div>
    <div class="name">Barack Obama</div>
</div>
```

### User - Inactive

![User - Inactive](example-images/inactive-user.png)

```html
<div class="user">
    <div class="status -inactive"></div>
    <div class="name">Barack Obama</div>
</div>
```

### User - Current user

![User - Offline](example-images/current-user.png)

```html
<div class="user -current">
    <div class="status -active"></div>
    <div class="name">Donald Trump</div>
</div>
```