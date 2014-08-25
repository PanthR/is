var is = require('../is');
var expect = require('chai').expect;

describe('type predicates', function() {
   it('is.number', function() {
      expect(is.number(5)).to.be.ok;
      expect(is.number("")).to.not.be.ok;
   });
   it('is.function', function() {
      expect(is.function(Math.abs)).to.be.ok;
      expect(is.function(Math.abs(2))).to.not.be.ok;
      expect(is.function(12)).to.not.be.ok;
      expect(is.function([3, 5, 6])).to.not.be.ok;
      expect(is.function("function(x) { return x; }")).to.not.be.ok;
   });
   it('is.array', function() {
      expect(is.array(Math.abs)).to.not.be.ok;
      expect(is.array(Math.abs(2))).to.not.be.ok;
      expect(is.array(12)).to.not.be.ok;
      expect(is.array([3, 5, 6])).to.be.ok;
      expect(is.array([[3, 5], 6])).to.be.ok;
      expect(is.array("function(x) { return x; }")).to.not.be.ok;
   });
   it('is.missing', function() {
      expect(is.missing()).to.be.ok;
      expect(is.missing(undefined)).to.be.ok;
      expect(is.missing(null)).to.be.ok;
      expect(is.missing(NaN)).to.not.be.ok;
      expect(is.missing([])).to.not.be.ok;
      expect(is.missing("")).to.not.be.ok;
      expect(is.missing(0)).to.not.be.ok;
      expect(is.missing(1)).to.not.be.ok;
      expect(is.missing(-1)).to.not.be.ok;
   });
});
describe('is.not tests', function() {
   it('is.not.number', function() {
      expect(is.not.number(5)).to.not.be.ok;
      expect(is.not.number("")).to.be.ok;
   });
   it('is.not.function', function() {
      expect(is.not.function(Math.abs)).to.not.be.ok;
      expect(is.not.function(Math.abs(2))).to.be.ok;
      expect(is.not.function(12)).to.be.ok;
      expect(is.not.function([3, 5, 6])).to.be.ok;
      expect(is.not.function("function(x) { return x; }")).to.be.ok;
   });
   it('is.not.array', function() {
      expect(is.not.array(Math.abs)).to.be.ok;
      expect(is.not.array(Math.abs(2))).to.be.ok;
      expect(is.not.array(12)).to.be.ok;
      expect(is.not.array([3, 5, 6])).to.not.be.ok;
      expect(is.not.array([[3, 5], 6])).to.not.be.ok;
      expect(is.not.array("function(x) { return x; }")).to.be.ok;
   });
   it('is.not.missing', function() {
      expect(is.not.missing()).to.not.be.ok;
      expect(is.not.missing(undefined)).to.not.be.ok;
      expect(is.not.missing(null)).to.not.be.ok;
      expect(is.not.missing([])).to.be.ok;
      expect(is.not.missing("")).to.be.ok;
      expect(is.not.missing(0)).to.be.ok;
      expect(is.not.missing(1)).to.be.ok;
      expect(is.not.missing(-1)).to.be.ok;
   });
});
