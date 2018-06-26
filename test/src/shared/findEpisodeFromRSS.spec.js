var expect = require("chai").expect;
var findEpisodeFromRSS = require("../../../src/shared/findEpisodeFromRSS");

describe("findEpisodeFromRSS.js", function() {
	it("has singleEpisode function", function() {
		expect(findEpisodeFromRSS.singleEpisode).to.exist;
	});
	it("has listEpisodes function", function() {
		expect(findEpisodeFromRSS.singleEpisode).to.exist;
	});
});