/**
 *  Stops the episode and saves offset value
 */
module.exports = {
    canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (
            handlerInput.requestEnvelope.request.intent.name === 'AudioPlayer.PlaybackFinished' ||
            handlerInput.requestEnvelope.request.intent.name === 'AudioPlayer.PlaybackStopped' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
        );
    },
    async handle(handlerInput) {
        let attributes = await handlerInput.attributesManager.getPersistentAttributes();
        attributes.offsetInMilliseconds = getOffset(handlerInput);

        return handlerInput.responseBuilder
            .speak('')
            .addAudioPlayerStopDirective()
            .getResponse();
    },
};

function getOffset(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent.name === 'AudioPlayer.PlaybackFinished') {
        return 0;
    }
    else {
        return handlerInput.requestEnvelope.request.offsetInMilliseconds;
    }
}
