const kk_api = require('../src/kk-api.js');
const assert = require('assert');
const sinon = require('sinon');
const winston = require('winston');
let request = require('request');

// Disable logging for tests
winston.remove(winston.transports.Console);

describe('kk-api', () => {
  describe('#weather()', () => {
    beforeEach(() => {
      // Stub request.get(...)
      this.requestStub = sinon.stub(request, 'get');
    });

    afterEach(() => {
      this.requestStub.restore();
    });

    it('should call correct url', () => {
      kk_api.weather();

      assert(this.requestStub.calledWithMatch({url: 'http://komakallio.dy.fi:9001/weather'}));
    });

    it('should call success_cb on success', () => {
      this.requestStub.callsArgWith(1, undefined, {statusCode: 200}, {});
      let success_cb = sinon.spy();
      let failure_cb = sinon.spy();

      kk_api.weather(success_cb, failure_cb);

      assert(success_cb.calledOnce);
      assert(failure_cb.notCalled);
    });

    it('should call failure_cb on wrong status code', () => {
      this.requestStub.callsArgWith(1, undefined, {statusCode: 404}, {});
      let success_cb = sinon.spy();
      let failure_cb = sinon.spy();

      kk_api.weather(success_cb, failure_cb);

      assert(success_cb.notCalled);
      assert(failure_cb.calledOnce);
    });

    it('should call failure_cb on error', () => {
      this.requestStub.callsArgWith(1, new Error('Error!'), {statusCode: 200}, {});
      let success_cb = sinon.spy();
      let failure_cb = sinon.spy();

      kk_api.weather(success_cb, failure_cb);

      assert(success_cb.notCalled);
      assert(failure_cb.calledOnce);
    });
  });
});
