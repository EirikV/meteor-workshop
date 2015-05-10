Template.header.helpers({
	isHome: function() {
		return Router.current().location.get().path === '/';
	}
});