'use strict'

// Include the Alexa Library.
const Alexa = require('ask-sdk');

// handlers
const launchRequestHandler   = require('./handlers/launchRequestHandler');
const playEpisodeHandler     = require('./handlers/playEpisodeHandler');
const listEpisodesHandler    = require('./handlers/listEpisodesHandler');
const resumeEpisodeHandler   = require('./handlers/resumeEpisodeHandler');
const playbackEndedHandler   = require('./handlers/playbackEndedHandler');
const helpHandler            = require('./handlers/helpHandler');
const unhandledHandler       = require('./handlers/unhandledHandler');

// interceptors
const loadPersistentAttributesRequestInterceptor = require('./interceptors/loadPersistentAttributesRequestInterceptor');
const savePersistentAttributesResponseInterceptor = require('./interceptors/savePersistentAttributesResponseInterceptor');

const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
        .addRequestHandlers(
            launchRequestHandler,
            playEpisodeHandler,
            listEpisodesHandler,
            resumeEpisodeHandler,
            playbackEndedHandler,
            helpHandler
        )
        .addRequestInterceptors(loadPersistentAttributesRequestInterceptor)
        .addResponseInterceptors(savePersistentAttributesResponseInterceptor)
        .addErrorHandlers(unhandledHandler)
        .withAutoCreateTable(true)
        .withTableName(process.env.DYNAMO_TABLE_NAME)
        .lambda();