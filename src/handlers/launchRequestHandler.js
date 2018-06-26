
const copy = {
    welcomeMessage: 'Welcome to the Bit Socket Podcast. Which episode would you like to listen to?',
    welcomeReprompt: 'You can say "play latest" to listen to our latest episode, or "list podcasts" to hear about other episodes. Say "help" for other options.',
    welcomeBackMessage: 'Welcome back. You were listening to ::episodeTitle::, you can continue listening by saying "resume", or ask to play a different episode. Which episode would you like to listen to?'
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