const kk_api = require('../src/kk-api.js');
const assert = require('assert');
const sinon = require('sinon');
const winston = require('winston');
const rp = require('request-promise-native');

// Disable logging for tests
winston.remove(winston.transports.Console);

describe('kk-api', () => {
  describe('#weather()', () => {
    beforeEach(() => {
      // Stub rp.get(...)
      this.requestStub = sinon.stub(rp, 'get');
    });

    afterEach(() => {
      this.requestStub.restore();
    });

    it('should call correct url', () => {
      this.requestStub.resolves({});

      kk_api.weather();

      assert(this.requestStub.calledWithMatch({url: 'http://komakallio.dy.fi:9001/weather'}));
    });

    it('should resolve on success', (done) => {
      this.requestStub.resolves({});

      kk_api.weather()
        .then(() => {
          assert(true);
          done();
        })
        .catch(() => {
          assert(false)
          done();
        });
    });

    it('should reject on error', (done) => {
      this.requestStub.rejects();

      kk_api.weather()
        .then(() => {
          assert(false);
          done();
        })
        .catch(() => {
          assert(true);
          done();
        });
    });
  });

  describe('#rain()', () => {
    beforeEach(() => {
      // Stub rp.get(...)
      this.requestStub = sinon.stub(rp, 'get');
    });

    afterEach(() => {
      this.requestStub.restore();
    });

    it('should call correct url', () => {
      this.requestStub.resolves({});

      kk_api.rain(() => {}, () => {});

      assert(this.requestStub.calledWithMatch({url: 'http://komakallio.dy.fi:9001/rain'}));
    });

    it('should call success_cb on success', (done) => {
      this.requestStub.resolves({});

      kk_api.rain(
        () => { assert(true); done(); },
        () => { assert(false); done(); });
    });

    it('should call failure_cb on error', (done) => {
      this.requestStub.rejects();

      kk_api.rain(
        () => { assert(false); done(); },
        () => { assert(true); done(); });
    });
  });
});
