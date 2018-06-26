
const copy = {
    message: 'You can play a specific episode number by saying "play episode twelve", or can list the most recent episode titles by saying "list episodes"',
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