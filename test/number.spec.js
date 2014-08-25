var is = require('../is');
var expect = require('chai').expect;

describe('numeric predicates', function() {
   it('is.nan', function() {
      expect(is.nan(NaN)).to.be.ok;
      expect(is.nan()).to.not.be.ok;
      expect(is.nan(null)).to.not.be.ok;
      expect(is.nan([])).to.not.be.ok;
      expect(is.nan("")).to.not.be.ok;
      expect(is.nan(0)).to.not.be.ok;
      expect(is.nan(1)).to.not.be.ok;
      expect(is.nan(Infinity)).to.not.be.ok;
   });
   it('is.infinity', function() {
      expect(is.infinity(NaN)).to.not.be.ok;
      expect(is.infinity(undefined)).to.not.be.ok;
      expect(is.infinity(null)).to.not.be.ok;
      expect(is.infinity()).to.not.be.ok;
      expect(is.infinity([])).to.not.be.ok;
      expect(is.infinity(0)).to.not.be.ok;
      expect(is.infinity(1)).to.not.be.ok;
      expect(is.infinity(13432423.123)).to.not.be.ok;
      expect(is.infinity(Infinity)).to.be.ok;
      expect(is.infinity(-Infinity)).to.be.ok;
   });
   it('is.finite', function() {
      expect(is.finite(NaN)).to.not.be.ok;
      expect(is.finite(undefined)).to.not.be.ok;
      expect(is.finite(null)).to.not.be.ok;
      expect(is.finite()).to.not.be.ok;
      expect(is.finite([])).to.not.be.ok;
      expect(is.finite(0)).to.be.ok;
      expect(is.finite(1)).to.be.ok;
      expect(is.finite(13432423.123)).to.be.ok;
      expect(is.finite(Infinity)).to.not.be.ok;
      expect(is.finite(-Infinity)).to.not.be.ok;
   });
   it('is.integer', function() {
      expect(is.integer(NaN)).to.not.be.ok;
      expect(is.integer(undefined)).to.not.be.ok;
      expect(is.integer(null)).to.not.be.ok;
      expect(is.integer()).to.not.be.ok;
      expect(is.integer([])).to.not.be.ok;
      expect(is.integer(0)).to.be.ok;
      expect(is.integer(1)).to.be.ok;
      expect(is.integer(13432423.123)).to.not.be.ok;
      expect(is.integer(Infinity)).to.not.be.ok;
      expect(is.integer(-Infinity)).to.not.be.ok;
   });
   it('is.eq', function() {
      expect(is.eq(2)(2)).to.be.ok;
      expect(is.eq(2)(3)).to.not.be.ok;
      expect(is.eq("")("")).to.be.ok;
      expect(is.eq([])([])).to.not.be.ok;
      expect(is.eq([])("")).to.not.be.ok;
      expect(is.eq(null)(null)).to.be.ok;
      expect(is.eq(undefined)(null)).to.not.be.ok;
      expect(is.eq(undefined)(undefined)).to.be.ok;
   });
   it('is.gt and friends', function() {
      expect(is.gt(5)(2)).to.not.be.ok;
      expect(is.gt(5)(5)).to.not.be.ok;
      expect(is.gt(5)(7)).to.be.ok;
      expect(is.ge(5)(2)).to.not.be.ok;
      expect(is.ge(5)(5)).to.be.ok;
      expect(is.ge(5)(7)).to.be.ok;
      expect(is.lt(5)(2)).to.be.ok;
      expect(is.lt(5)(5)).to.not.be.ok;
      expect(is.lt(5)(7)).to.not.be.ok;
      expect(is.le(5)(2)).to.be.ok;
      expect(is.le(5)(5)).to.be.ok;
      expect(is.le(5)(7)).to.not.be.ok;
   });
});
describe('is.not tests', function() {
   it('is.not.nan', function() {
      expect(is.not.nan(NaN)).to.not.be.ok;
      expect(is.not.nan()).to.be.ok;
      expect(is.not.nan(null)).to.be.ok;
      expect(is.not.nan([])).to.be.ok;
      expect(is.not.nan("")).to.be.ok;
      expect(is.not.nan(0)).to.be.ok;
      expect(is.not.nan(1)).to.be.ok;
      expect(is.not.nan(Infinity)).to.be.ok;
   });
   it('is.not.finite', function() {
      expect(is.not.finite(NaN)).to.be.ok;
      expect(is.not.finite(Infinity)).to.be.ok;
      expect(is.not.finite(null)).to.be.ok;
      expect(is.not.finite()).to.be.ok;
      expect(is.not.finite([])).to.be.ok;
      expect(is.not.finite(0)).to.not.be.ok;
      expect(is.not.finite(1)).to.not.be.ok;
      expect(is.not.finite(13432423.123)).to.not.be.ok;
      expect(is.not.finite(Infinity)).to.be.ok;
      expect(is.not.finite(-Infinity)).to.be.ok;
   });
   it('is.not.gt and friends', function() {
      expect(is.not.gt(5)(2)).to.be.ok;
      expect(is.not.gt(5)(5)).to.be.ok;
      expect(is.not.gt(5)(7)).to.not.be.ok;
      expect(is.not.ge(5)(2)).to.be.ok;
      expect(is.not.ge(5)(5)).to.not.be.ok;
      expect(is.not.ge(5)(7)).to.not.be.ok;
      expect(is.not.lt(5)(2)).to.not.be.ok;
      expect(is.not.lt(5)(5)).to.be.ok;
      expect(is.not.lt(5)(7)).to.be.ok;
      expect(is.not.le(5)(2)).to.not.be.ok;
      expect(is.not.le(5)(5)).to.not.be.ok;
      expect(is.not.le(5)(7)).to.be.ok;
   });
});
