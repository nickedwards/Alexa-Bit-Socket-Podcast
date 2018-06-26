var expect = require("chai").expect;
var imageUrls = require("../../../src/shared/imageUrls");

describe("imageUrls.js", function() {
	it("has image urls set", function() {
		expect(imageUrls.cardImages.smallImageUrl).to.exist;
		expect(imageUrls.cardImages.largeImageUrl).to.exist;
	});
});