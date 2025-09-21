/*
*
*
* Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      // Handle cases where either the number or the unit is invalid.
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.send('invalid number and unit');
      } else if (initNum === 'invalid number') {
        return res.send('invalid number');
      } else if (initUnit === 'invalid unit') {
        return res.send('invalid unit');
      }
      
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      // If everything is valid, return the JSON object.
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    });
    
};
