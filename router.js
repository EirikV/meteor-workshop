Router.configure({
	layoutTemplate: "Layout",
	notFoundTemplate: "NotFound"
});

Router.map(function() {
	this.route('Posts', {path: '/'});
	this.route('Login', {path: '/login'});
});
