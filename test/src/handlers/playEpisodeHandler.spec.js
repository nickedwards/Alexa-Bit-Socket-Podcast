let chai = require('chai');
chai.use(require('chai-string'));

let should = chai.should();
let assert = chai.assert;

describe("PlayEpisodeHandler : latestEpisode", function() {
    // pre-requisites
    before(() => {
        return new Promise((resolve, reject) => {
            const event = require('../requests/playEpisodeRequest.json');
            let lambda = require('../../../src/index');
            lambda.handler(event, null, (error, result) => {
                // console.log('******* RESPONSE *********');
                // console.log(JSON.stringify(result, null, 2));
                // console.log('**************************');
                response = result;
                resolve();
            });
        });
    });

    it('responds with valid response structure ',  () => {

        response.should.have.property("version");
        response.version.should.equal("1.0");
    }),

    it('responds with output speech ', () => {

        response.should.have.property("response");
        let r = response.response;

        r.should.have.property("outputSpeech");
        r.outputSpeech.should.have.property("type");
        r.outputSpeech.type.should.equal('SSML');
        r.outputSpeech.should.have.property("ssml");
        r.outputSpeech.ssml.should.startWith('<speak>');
        r.outputSpeech.ssml.should.endWith('</speak>');

    }),

    it('responds with play directive ', () => {

        response.should.have.property("response");
        let r = response.response;
        
        r.should.have.property("directives");
        r.directives[0].type.should.equal("AudioPlayer.Play");
        r.directives[0].playBehavior.should.equal("REPLACE_ALL");
        r.directives[0].audioItem.stream.should.exist;
        r.directives[0].audioItem.stream.url.should.startWith('https://');

    }),

    it('responds with standard card ', () => {

        response.should.have.property("response");
        let r = response.response;
        
        r.should.have.property("card");
        r.card.type.should.equal("Standard");
        r.card.title.should.exist;
        r.card.text.should.exist;
        r.card.image.should.exist;

    })
});

describe("PlayEpisodeHandler : specificEpisode", function() {
    // pre-requisites
    before(() => {
        return new Promise((resolve, reject) => {
            const event = require('../requests/playSpecificEpisodeRequest.json');
            let lambda = require('../../../src/index');
            lambda.handler(event, null, (error, result) => {
                // console.log('******* RESPONSE *********');
                // console.log(JSON.stringify(result, null, 2));
                // console.log('**************************');
                response = result;
                resolve();
            });
        });
    });

    it('responds with valid response structure ',  () => {

        response.should.have.property("version");
        response.version.should.equal("1.0");
    }),

    it('responds with output speech ', () => {

        response.should.have.property("response");
        let r = response.response;

        r.should.have.property("outputSpeech");
        r.outputSpeech.should.have.property("type");
        r.outputSpeech.type.should.equal('SSML');
        r.outputSpeech.should.have.property("ssml");
        r.outputSpeech.ssml.should.startWith('<speak>');
        r.outputSpeech.ssml.should.endWith('</speak>');

    }),

    it('responds with play directive ', () => {

        response.should.have.property("response");
        let r = response.response;
        
        r.should.have.property("directives");
        r.directives[0].type.should.equal("AudioPlayer.Play");
        r.directives[0].playBehavior.should.equal("REPLACE_ALL");
        r.directives[0].audioItem.stream.should.exist;
        r.directives[0].audioItem.stream.url.should.startWith('https://');

    }),

    it('responds with standard card ', () => {

        response.should.have.property("response");
        let r = response.response;
        
        r.should.have.property("card");
        r.card.type.should.equal("Standard");
        r.card.title.should.exist;
        r.card.text.should.exist;
        r.card.image.should.exist;

    })
});



describe("PlayEpisodeHandler : previousEpisode", function() {
    // pre-requisites
    before(() => {
        return new Promise((resolve, reject) => {
            const event = require('../requests/playPreviousEpisodeRequest.json');
            let lambda = require('../../../src/index');
            lambda.handler(event, null, (error, result) => {
                // console.log('******* RESPONSE *********');
                // console.log(JSON.stringify(result, null, 2));
                // console.log('**************************');
                response = result;
                resolve();
            });
        });
    });

    it('responds with valid response structure ',  () => {

        response.should.have.property("version");
        response.version.should.equal("1.0");
    }),

    it('responds with output speech ', () => {

        response.should.have.property("response");
        let r = response.response;

        r.should.have.property("outputSpeech");
        r.outputSpeech.should.have.property("type");
        r.outputSpeech.type.should.equal('SSML');
        r.outputSpeech.should.have.property("ssml");
        r.outputSpeech.ssml.should.startWith('<speak>');
        r.outputSpeech.ssml.should.endWith('</speak>');

    }),

    it('responds with play directive ', () => {

        response.should.have.property("response");
        let r = response.response;
        
        r.should.have.property("directives");
        r.directives[0].type.should.equal("AudioPlayer.Play");
        r.directives[0].playBehavior.should.equal("REPLACE_ALL");
        r.directives[0].audioItem.stream.should.exist;
        r.directives[0].audioItem.stream.url.should.startWith('https://');

    }),

    it('responds with standard card ', () => {

        response.should.have.property("response");
        let r = response.response;
        
        r.should.have.property("card");
        r.card.type.should.equal("Standard");
        r.card.title.should.exist;
        r.card.text.should.exist;
        r.card.image.should.exist;

    })
});

describe("PlayEpisodeHandler : nextEpisode", function() {
    // pre-requisites
    before(() => {
        return new Promise((resolve, reject) => {
            const event = require('../requests/playNextEpisodeRequest.json');
            let lambda = require('../../../src/index');
            lambda.handler(event, null, (error, result) => {
                // console.log('******* RESPONSE *********');
                // console.log(JSON.stringify(result, null, 2));
                // console.log('**************************');
                response = result;
                resolve();
            });
        });
    });

    it('responds with valid response structure ',  () => {

        response.should.have.property("version");
        response.version.should.equal("1.0");
    }),

    it('responds with output speech ', () => {

        response.should.have.property("response");
        let r = response.response;

        r.should.have.property("outputSpeech");
        r.outputSpeech.should.have.property("type");
        r.outputSpeech.type.should.equal('SSML');
        r.outputSpeech.should.have.property("ssml");
        r.outputSpeech.ssml.should.startWith('<speak>');
        r.outputSpeech.ssml.should.endWith('</speak>');

    }),

    it('responds with play directive ', () => {

        response.should.have.property("response");
        let r = response.response;
        
        r.should.have.property("directives");
        r.directives[0].type.should.equal("AudioPlayer.Play");
        r.directives[0].playBehavior.should.equal("REPLACE_ALL");
        r.directives[0].audioItem.stream.should.exist;
        r.directives[0].audioItem.stream.url.should.startWith('https://');

    }),

    it('responds with standard card ', () => {

        response.should.have.property("response");
        let r = response.response;
        
        r.should.have.property("card");
        r.card.type.should.equal("Standard");
        r.card.title.should.exist;
        r.card.text.should.exist;
        r.card.image.should.exist;

    })
});