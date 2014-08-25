var is = require('../is');
var expect = require('chai').expect;

describe('combinators of predicates', function() {
   it('is.its', function() {
      expect(is.its('a').eq(2)({ a: 2 })).to.be.ok;
      expect(is.its('a').eq(2)({ b: 2 })).to.not.be.ok;
      expect(is.its('a').eq(2)({ a: 4 })).to.not.be.ok;
      expect(is.its('a').eq(2)(null)).to.not.be.ok;
   });
});
describe('is.not tests', function() {
   it('is.its.not', function() {
      expect(is.its('a').not.eq(2)({ a: 3 })).to.be.ok;
      expect(is.not.its('a').eq(2)({ a: 3 })).to.be.ok;
      expect(is.its('a').not.eq(2)({ a: 2 })).to.not.be.ok;
      expect(is.not.its('a').eq(2)({ a: 2 })).to.not.be.ok;
      expect(is.not.its('a').not.eq(2)({ a: 2 })).to.be.ok;
      expect(is.not.its('a').not.eq(2)({ a: 3 })).to.not.be.ok;
   });
});