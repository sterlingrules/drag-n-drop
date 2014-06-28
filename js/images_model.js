var imagesModel = (function() {
	var path = 'img/',
		imageFilenames = [
			path + "dsc_6001.jpg",
			path + "dsc_6081.jpg",
			path + "dsc_6013.jpg",
			path + "dsc_6268.jpg",
			path + "dsc_6397.jpg",
			path + "dsc_6345.jpg",
			path + "dsc_6378.jpg",
			path + "dsc_6413.jpg",
			path + "dsc_6417.jpg"
		];

	return {
		all: function() {
			return imageFilenames;
		}
	}
})();