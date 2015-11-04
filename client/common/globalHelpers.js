Template.registerHelper('isHome', function () {
    return Router.current().location.get().path === '/';
});
