
const copy = {
    welcomeMessage: 'Welcome to the Bit Socket Podcast. Which episode would you like to listen to?',
    welcomeReprompt: 'You can say "play latest" to listen to our latest episode, or "list podcasts" to hear about other episodes. Say "help" for other options.'
};

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(copy.welcomeMessage)
            .reprompt(copy.welcomeReprompt)
            .getResponse();
    }
};