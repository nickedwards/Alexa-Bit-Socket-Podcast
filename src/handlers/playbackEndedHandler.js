/**
 *  Stops the episode and saves offset value
 */
module.exports = {
    canHandle(handlerInput) {
    return (
        handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
        )
    ) ||
    (
        handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackFinished' ||
        handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped'
    );
    },
    async handle(handlerInput) {
        if (handlerInput.requestEnvelope.request.type.startsWith('AudioPlayer.')) {
            let attributes = await handlerInput.attributesManager.getPersistentAttributes();
            attributes.offsetInMilliseconds = getOffset(handlerInput);
        }

        return handlerInput.responseBuilder
            .speak('')
            .addAudioPlayerStopDirective()
            .getResponse();
    },
};

function getOffset(handlerInput) {
    if (handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackFinished') {
        return 0;
    }
    else {
        return handlerInput.requestEnvelope.request.offsetInMilliseconds;
    }
}
