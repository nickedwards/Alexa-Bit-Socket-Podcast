
const findEpisodeFromRSS = require('../shared/findEpisodeFromRSS');

const copy = {
    reprompt: 'Which episode would you like to listen to?'
}

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ListEpisodes';
    },
    handle(handlerInput) {
        return findEpisodeFromRSS.listEpisodes().then(function (listOfEpisodes) {
            return handlerInput.responseBuilder
                .speak(listOfEpisodes + ' <break time=\"1s\"/> ' + copy.reprompt)
                .reprompt(copy.reprompt)
                .getResponse();
        });
    },
};