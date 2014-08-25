var is = require('../is');
var expect = require('chai').expect;

describe('string predicates', function() {
   it('is.containedIn', function() {
      expect(is.containedIn("abgde")("ab")).to.be.ok;
      expect(is.containedIn("abgdeabg")("bg")).to.be.ok;
      expect(is.containedIn("abgde")("de")).to.be.ok;
      expect(is.containedIn("abgde")("d")).to.be.ok;
      expect(is.containedIn("abgde")("")).to.be.ok;
      expect(is.containedIn("abgde")("ed")).to.not.be.ok;
   });
   it('is.extensionOf', function() {
      expect(is.extensionOf("ab")("abgde")).to.be.ok;
      expect(is.extensionOf("bg")("abgdeabg")).to.be.ok;
      expect(is.extensionOf("de")("abgde")).to.be.ok;
      expect(is.extensionOf("d")("abgde")).to.be.ok;
      expect(is.extensionOf("")("abgde")).to.be.ok;
      expect(is.extensionOf("ed")("abgde")).to.not.be.ok;
   });
   it('is.startingWith', function() {
      expect(is.startingWith("ab")("abgde")).to.be.ok;
      expect(is.startingWith("bg")("abgdeabg")).to.not.be.ok;
      expect(is.startingWith("de")("abgde")).to.not.be.ok;
      expect(is.startingWith("a")("abgde")).to.be.ok;
      expect(is.startingWith("")("abgde")).to.be.ok;
      expect(is.startingWith("ed")("abgde")).to.not.be.ok;
   });
   it('is.endingIn', function() {
      expect(is.endingIn("ab")("abgde")).to.not.be.ok;
      expect(is.endingIn("bg")("abgdeab")).to.not.be.ok;
      expect(is.endingIn("de")("abgde")).to.be.ok;
      expect(is.endingIn("a")("abgde")).to.not.be.ok;
      expect(is.endingIn("e")("abgde")).to.be.ok;
      expect(is.endingIn("")("abgde")).to.be.ok;
      expect(is.endingIn("ed")("abgde")).to.not.be.ok;
   });
});
describe('is.not tests', function() {
   it('is.not.containedIn', function() {
      expect(is.not.containedIn("abgde")("ab")).to.not.be.ok;
      expect(is.not.containedIn("abgdeabg")("bg")).to.not.be.ok;
      expect(is.not.containedIn("abgde")("de")).to.not.be.ok;
      expect(is.not.containedIn("abgde")("d")).to.not.be.ok;
      expect(is.not.containedIn("abgde")("")).to.not.be.ok;
      expect(is.not.containedIn("abgde")("ed")).to.be.ok;
   });
   it('is.not.extensionOf', function() {
      expect(is.not.extensionOf("ab")("abgde")).to.not.be.ok;
      expect(is.not.extensionOf("bg")("abgdeabg")).to.not.be.ok;
      expect(is.not.extensionOf("de")("abgde")).to.not.be.ok;
      expect(is.not.extensionOf("d")("abgde")).to.not.be.ok;
      expect(is.not.extensionOf("")("abgde")).to.not.be.ok;
      expect(is.not.extensionOf("ed")("abgde")).to.be.ok;
   });
   it('is.not.startingWith', function() {
      expect(is.not.startingWith("ab")("abgde")).to.not.be.ok;
      expect(is.not.startingWith("bg")("abgdeabg")).to.be.ok;
      expect(is.not.startingWith("de")("abgde")).to.be.ok;
      expect(is.not.startingWith("a")("abgde")).to.not.be.ok;
      expect(is.not.startingWith("")("abgde")).to.not.be.ok;
      expect(is.not.startingWith("ed")("abgde")).to.be.ok;
   });
   it('is.not.endingIn', function() {
      expect(is.not.endingIn("ab")("abgde")).to.be.ok;
      expect(is.not.endingIn("bg")("abgdeab")).to.be.ok;
      expect(is.not.endingIn("de")("abgde")).to.not.be.ok;
      expect(is.not.endingIn("a")("abgde")).to.be.ok;
      expect(is.not.endingIn("e")("abgde")).to.not.be.ok;
      expect(is.not.endingIn("")("abgde")).to.not.be.ok;
      expect(is.not.endingIn("ed")("abgde")).to.be.ok;
   });
});