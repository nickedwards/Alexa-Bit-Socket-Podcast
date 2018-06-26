
const cardImages = require('../shared/imageUrls').cardImages;

const copy = {
	nothingToResume: 'You aren\'t currently listening to an episode. ',
	nothingToResumeReprompt: 'Which episode would you like to listen to?'
};

/**
 * Resume the last requested podcast
 */
module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent'
            );
    },
    async handle(handlerInput) {
        let attributes = await handlerInput.attributesManager.getPersistentAttributes();
        if (attributes.episodeMp3Url && attributes.episodeTitle) {
            let offset = attributes.offsetInMilliseconds || 0;
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
                    offset,
                    null
                )
                .withStandardCard(
                    cardData.title,
                    cardData.content,
                    cardData.images.smallImageUrl,
                    cardData.images.largeImageUrl
                )
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .speak(copy.nothingToResume + '<break time=\"1s\"/>' + copy.nothingToResumeReprompt)
                .reprompt(copy.nothingToResumeReprompt)
                .getResponse();
        }
    },
};