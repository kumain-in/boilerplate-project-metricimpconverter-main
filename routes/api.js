/*
*
*
* Complete the API routing logic below
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
      const input = req.query.input;
      
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      // Check for errors from the number and unit handlers
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.json({ error: 'invalid number and unit' });
      }
      if (initNum === 'invalid number') {
        return res.json({ error: 'invalid number' });
      }
      if (initUnit === 'invalid unit') {
        return res.json({ error: 'invalid unit' });
      }

      // If inputs are valid, proceed with the conversion
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // Construct and send the final JSON response
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    });
    
};