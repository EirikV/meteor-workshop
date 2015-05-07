Template.registerHelper("getAvatar", function(imageId) {
	var image = Images.findOne(imageId);
	if(!image)
		return '/img/user.png';
	return image.url();
});