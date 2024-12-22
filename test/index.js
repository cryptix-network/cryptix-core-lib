"use strict";

var should = require('chai').should();
var cryptixcore = require('../');

describe('#versionGuard', function() {
  it('global._cryptixcoreLibVersion should be defined', function() {
    should.equal(global._cryptixcoreLibVersion, cryptixcore.version);
  });

  it('throw an error if version is already defined', function() {
    (function() {
      cryptixcore.versionGuard('version');
    }).should.throw('More than one instance of bitcore');
  });
});
