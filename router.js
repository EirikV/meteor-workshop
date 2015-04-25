Router.configure({
	layoutTemplate: "Layout",
	notFoundTemplate: "NotFound"
});

Router.route("/", function() {
	this.render("Posts");
});

Router.route("/login", function() {
	this.render("Login");
});