
const copy = {
    message: 'You can play a specific episode number by saying, for example, "play episode twelve", list the most recent episode titles by saying "list episodes", or can ask for more information about an episode by asking, for example, "more information about episode fifteen".',
    reprompt: 'Which episode would you like to play?'
};

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(copy.message + ' <break time=\"1s\"/> ' + copy.reprompt)
            .reprompt(copy.reprompt)
            .getResponse();
    },
};