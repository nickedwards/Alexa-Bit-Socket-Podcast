module.exports = {
    async process(handlerInput) {
        const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();

        // Check if user is invoking the skill the first time and initialize preset values
        if (Object.keys(persistentAttributes).length === 0) {
            handlerInput.attributesManager.setPersistentAttributes({
                episodeMp3Url       : '',
                episodeTitle        : '',
                episodeNumber       : 0,
                episodeWebUrl       : '',
                episodeDescription  : '',
                offsetInMilliseconds: 0
            });
        }
    },
}