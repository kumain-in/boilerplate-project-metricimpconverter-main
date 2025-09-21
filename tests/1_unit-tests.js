const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function() {

    test('Whole number input', function(done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal number input', function(done) {
      const input = '32.2L';
      assert.equal(convertHandler.getNum(input), 32.2);
      done();
    });

    test('Fractional input', function(done) {
      const input = '1/2L';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test('Fractional input with a decimal', function(done) {
      const input = '5.4/3L';
      assert.approximately(convertHandler.getNum(input), 1.8, 0.00001);
      done();
    });

    test('Error on a double-fraction', function(done) {
      const input = '3/2/3L';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });

    test('Default to a numerical input of 1 when no numerical input is provided', function(done) {
      const input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

  });

  suite('Function convertHandler.getUnit(input)', function() {

    test('Read each valid input unit', function(done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      const output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), output[i]);
      });
      done();
    });

    test('Error for an invalid input unit', function(done) {
      const input = '32g';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });

  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {

    test('Return correct return unit for each valid input unit', function(done) {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {

    test('Return the spelled-out string unit for each valid input unit', function(done) {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.convert(num, unit)', function() {

    test('Convert gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('Convert L to gal', function(done) {
      const input = [5, 'L'];
      const expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert mi to km', function(done) {
      const input = [5, 'mi'];
      const expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert km to mi', function(done) {
      const input = [5, 'km'];
      const expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert lbs to kg', function(done) {
      const input = [5, 'lbs'];
      const expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert kg to lbs', function(done) {
      const input = [5, 'kg'];
      const expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

  });

});
