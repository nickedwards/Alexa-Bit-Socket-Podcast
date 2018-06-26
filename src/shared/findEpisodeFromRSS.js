const rssToJson = require("rss-to-json");

const copy = {
    podcastNotFound: 'Sorry, I couldn\'t find that podcast.',
    listOfEpisodes : 'There are ::numEpisodes:: episodes available. The latest 5 episodes are:'
};

// get all episodes from the RSS feed
function getRssData() {
    return new Promise(function(resolve, reject) {
        const rssUrl = 'https://bit-socket.squarespace.com/podcast?format=rss';
        rssToJson.load(rssUrl, function(err, rss){
            if (err) {
                return reject('RSS feed can\t be read');
            }
            let episodes = rss.items;
            episodes = episodes.filter(anEpisode => anEpisode.title.startsWith("Episode "));
            return resolve(episodes);
        });
    });
}

let allEpisodes;

module.exports = {
    singleEpisode: function(slots) {
        return new Promise((resolve, reject) => {
            getRssData().then(function(allEpisodes) {
                let foundEpisode,
                    foundEpisodeNumber;
                // podcast slot has been provided, we're looking for a specific episode
                if (slots && slots.episodeNumber && slots.episodeNumber.value) {
                    foundEpisode = allEpisodes.reverse()[slots.episodeNumber.value - 1]; // -1 as array starts at 0
                    foundEpisodeNumber = slots.episodeNumber.value;

                    // podcast number has not been found, error out
                    if (typeof foundEpisode === 'undefined') {
                        return reject(copy.podcastNotFound);
                    }
                // otherwise, return the latest episode
                } else {
                    foundEpisode = allEpisodes[0];
                    foundEpisodeNumber = foundEpisode.itunes_episode; // this is set on newer episodes in the feed, but not older ones, so should be fine to use here
                }

                let episodeDetails = {
                    episodeMp3Url: foundEpisode.media.content[0].url,
                    episodeWebUrl: foundEpisode.url,
                    episodeTitle : foundEpisode.title,
                    episodeNumber: foundEpisodeNumber,
                    episodeDescription: foundEpisode.itunes_summary
                };

                return resolve(episodeDetails);
            });
        });
    },

    listEpisodes: function() {
        return new Promise((resolve, reject) => {
            getRssData().then(function(allEpisodes) {
                let message = copy.listOfEpisodes.replace('::numEpisodes::', allEpisodes.length);
                for (i = 0; i < 5; i++) {
                    message += ' <break time=\"1s\"/>' + allEpisodes[i].title;
                    if (i < 4) {
                        message += ',';
                    }
                }
                return resolve(message);
            });
        });
    }
}