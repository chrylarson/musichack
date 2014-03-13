'use strict';

describe('Service: phonegapReady', function () {

  // load the service's module
  beforeEach(module('musicApp'));

  // instantiate service
  var phonegapReady;
  beforeEach(inject(function (_phonegapReady_) {
    phonegapReady = _phonegapReady_;
  }));

  it('should do something', function () {
    expect(!!phonegapReady).toBe(true);
  });

});
