
const findEpisodeFromRSS = require('../shared/findEpisodeFromRSS');
const cardImages = require('../shared/imageUrls').cardImages;

const copy = {
    reprompt: 'Which episode would you like to play?'
}

module.exports = {
    canHandle(handlerInput) {
        return ( // latest or specific episode number
            handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (
                handlerInput.requestEnvelope.request.intent.name === 'PlayLatestEpisode' ||
                handlerInput.requestEnvelope.request.intent.name === 'PlayEpisode'
            )
        ) || 
        ( // next episode
            handlerInput.requestEnvelope.request.type === 'PlaybackController.NextCommandIssued' ||
            (
                handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent'
            )
        ) || 
        ( // previous episode
            handlerInput.requestEnvelope.request.type === 'PlaybackController.PreviousCommandIssued' ||
            (
                handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent'
            )
        );
    },
    async handle(handlerInput) {
        let attributes = await handlerInput.attributesManager.getPersistentAttributes();
        // which episode number to play. If 0 is passed in, it will play the latest episode
        let episodeNumber = 0;
        if (
            handlerInput.requestEnvelope.request.intent.slots && 
            handlerInput.requestEnvelope.request.intent.slots.episodeNumber && 
            handlerInput.requestEnvelope.request.intent.slots.episodeNumber.value
        ) {
            episodeNumber = handlerInput.requestEnvelope.request.intent.slots.episodeNumber.value;
        }
        else if ( // next episode
            handlerInput.requestEnvelope.request.type === 'PlaybackController.NextCommandIssued' ||
            (
                handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent'
            )
        ) {
            episodeNumber = parseInt(attributes.episodeNumber, 10) + 1;
        }
        else if ( // previous episode
            handlerInput.requestEnvelope.request.type === 'PlaybackController.PreviousCommandIssued' ||
            (
                handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent'
            )
        ) {
            episodeNumber = parseInt(attributes.episodeNumber, 10) - 1;
            if (episodeNumber < 1) {
                episodeNumber = 1;
            }
        }

        return findEpisodeFromRSS.singleEpisode(episodeNumber)
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
        })
        .catch((err) => {
            return handlerInput.responseBuilder
                .speak(err.message + ' <break time=\"1s\"/> ' + copy.reprompt)
                .reprompt(copy.reprompt)
                .getResponse();
        });
    },
};