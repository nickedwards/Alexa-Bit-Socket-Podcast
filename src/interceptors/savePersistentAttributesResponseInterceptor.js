module.exports = {
    async process(handlerInput) {
        await handlerInput.attributesManager.savePersistentAttributes();
    },
};