
const findEpisodeFromRSS = require('../shared/findEpisodeFromRSS');
const cardImages = require('../shared/imageUrls').cardImages;

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (
                handlerInput.requestEnvelope.request.intent.name === 'PlayLatestEpisode' ||
                handlerInput.requestEnvelope.request.intent.name === 'PlayEpisode'
            );
    },
    async handle(handlerInput) {
        let attributes = await handlerInput.attributesManager.getPersistentAttributes();
        return findEpisodeFromRSS.singleEpisode(handlerInput.requestEnvelope.request.intent.slots)
        .then((episodeDetails) => {
            attributes.episodeMp3Url        = episodeDetails.episodeMp3Url.toString().replace('http:','https:');
            attributes.episodeTitle         = episodeDetails.episodeTitle;
            attributes.episodeDescription   = episodeDetails.episodeDescription;
            attributes.episodeNumber        = episodeDetails.episodeNumber;
            attributes.episodeWebUrl        = episodeDetails.episodeWebUrl;
            attributes.offsetInMilliseconds = 0;

            let cardData = {
                title: 'Playing Episode ' + attributes.episodeNumber,
                content: attributes.episodeTitle + ': ' + attributes.episodeDescription,
                images: cardImages
            }

            return handlerInput.responseBuilder
                .speak('')
                .withShouldEndSession(true)
                .addAudioPlayerPlayDirective(
                    'REPLACE_ALL',
                    attributes.episodeMp3Url, 
                    JSON.stringify({ mp3Url: attributes.episodeMp3Url, episodeTitle: attributes.episodeTitle }), 
                    attributes.offsetInMilliseconds,
                    null
                )
                .withStandardCard(
                    cardData.title,
                    cardData.content,
                    cardData.images.smallImageUrl,
                    cardData.images.largeImageUrl
                )
                .getResponse();
        });
    },
};