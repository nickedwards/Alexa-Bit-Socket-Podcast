let chai = require('chai');
chai.use(require('chai-string'));

let should = chai.should();
let assert = chai.assert;

describe("PlaybackEndedHandler : stop", function() {
    // pre-requisites
    before(() => {
        return new Promise((resolve, reject) => {
            const event = require('../requests/stopRequest.json');
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

    it('responds with stop directive ',  () => {

        response.should.have.property("response");
        let r = response.response;
        
        r.should.have.property("directives");
        r.directives[0].type.should.equal("AudioPlayer.Stop");
    })
});

describe("PlaybackEndedHandler : playbackFinished", function() {
    // pre-requisites
    before(() => {
        return new Promise((resolve, reject) => {
            const event = require('../requests/playbackFinishedRequest.json');
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

    it('responds with stop directive ',  () => {

        response.should.have.property("response");
        let r = response.response;

        r.directives[0].type.should.equal("AudioPlayer.Stop");
    })
});