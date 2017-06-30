const kk_api = require('../src/kk-api.js');
const assert = require('assert');
const sinon = require('sinon');
let request = require('request');

describe('kk-api', () => {
  describe('#weather()', () => {
    beforeEach(() => {
      this.requestStub = sinon.stub(request, 'get');
    });

    afterEach(() => {
      this.requestStub.restore();
    });

    it('should call correct url', () => {
      kk_api.weather();
      assert(this.requestStub.calledWithMatch({url: 'http://komakallio.dy.fi:9001/weather'}));
    });
  });
});
