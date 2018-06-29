
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
                handlerInput.requestEnvelope.request.intent.name === 'DescribeEpisode'
            )
        );
    },
    async handle(handlerInput) {
        // which episode number to play. If 0 is passed in, it will play the latest episode
        let episodeNumber = 0;
        if (
            handlerInput.requestEnvelope.request.intent.slots && 
            handlerInput.requestEnvelope.request.intent.slots.episodeNumber && 
            handlerInput.requestEnvelope.request.intent.slots.episodeNumber.value
        ) {
            episodeNumber = handlerInput.requestEnvelope.request.intent.slots.episodeNumber.value;
        }

        return findEpisodeFromRSS.singleEpisode(episodeNumber)
        .then((episodeDetails) => {
            let message = episodeDetails.episodeTitle + ': ' + episodeDetails.episodeDescription;
            return handlerInput.responseBuilder
                .speak(message + ' <break time=\"1s\"/> ' + copy.reprompt)
                .reprompt(copy.reprompt)
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