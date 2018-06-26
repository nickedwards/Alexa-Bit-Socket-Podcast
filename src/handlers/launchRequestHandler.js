
const copy = {
    welcomeMessage: 'Welcome to the Bit Socket Podcast. Which episode would you like to play?',
    welcomeReprompt: 'You can say "play latest" to listen to our latest episode, or "list podcasts" to hear about other episodes. Say "help" for other options.',
    welcomeBackMessage: 'Welcome back! You can continue listening to ::episodeTitle::, by saying "resume", or choose to play a different episode. Which episode would you like to play?'
};

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        let attributes = await handlerInput.attributesManager.getPersistentAttributes();
        let message = copy.welcomeMessage;
        if (attributes.offsetInMilliseconds) {
            message = copy.welcomeBackMessage.replace("::episodeTitle::", attributes.episodeTitle);
        }
        return handlerInput.responseBuilder
            .speak(message)
            .reprompt(copy.welcomeReprompt)
            .getResponse();
    }
};