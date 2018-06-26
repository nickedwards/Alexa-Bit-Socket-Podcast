
const copy = {
        message: 'Sorry, I didn\'t understand that. Please try again.'
};

module.exports = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak(copy.message)
            .reprompt(copy.message)
            .getResponse();
    }
};