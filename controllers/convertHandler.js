function ConvertHandler() {
  
  this.getNum = function(input) {
    // Find the index of the first alphabetical character to separate number from unit
    const firstCharIndex = input.search(/[a-zA-Z]/);
    let numStr;

    if (firstCharIndex === 0) { // No number provided, e.g., "kg"
      numStr = '1';
    } else if (firstCharIndex === -1) { // No unit provided, e.g., "10"
      numStr = input;
    } else {
      numStr = input.substring(0, firstCharIndex);
    }
    
    // Check for double-fractions (more than one '/') which is invalid
    const slashes = numStr.match(/\//g);
    if (slashes && slashes.length > 1) {
      return 'invalid number';
    }
    
    // Evaluate the numerical string which could be a whole number, decimal, or fraction
    let result;
    if (numStr.includes('/')) {
      const [numerator, denominator] = numStr.split('/');
      const num = parseFloat(numerator);
      const den = parseFloat(denominator);
      
      // Ensure both parts of the fraction are valid numbers
      if (isNaN(num) || isNaN(den) || den === 0) {
        return 'invalid number';
      }
      result = num / den;
    } else {
      result = parseFloat(numStr);
    }
    
    // If the result is not a number, the input was invalid
    if (isNaN(result)) {
      return 'invalid number';
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    // Find the index of the first alphabetical character
    const firstCharIndex = input.search(/[a-zA-Z]/);
    
    // If no alphabetical character is found, the unit is invalid
    if (firstCharIndex === -1) {
      return 'invalid unit';
    }
    
    // Extract the unit string
    const unitStr = input.substring(firstCharIndex);
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const lowerCaseUnit = unitStr.toLowerCase();

    // Check if the extracted unit is in our list of valid units
    if (validUnits.includes(lowerCaseUnit)) {
      // The project requires 'L' to be returned for liters, not 'l'
      return lowerCaseUnit === 'l' ? 'L' : lowerCaseUnit;
    }
    
    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const unit = initUnit.toLowerCase();
    const unitMap = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[unit];
  };

  this.spellOutUnit = function(unit) {
    const unitLower = unit.toLowerCase();
    const spellOutMap = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellOutMap[unitLower];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    const unit = initUnit.toLowerCase();

    switch (unit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    
    // Round the result to 5 decimal places and use Number() to remove any trailing zeros
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitSpelled = this.spellOutUnit(initUnit);
    const returnUnitSpelled = this.spellOutUnit(returnUnit);
    
    return `${initNum} ${initUnitSpelled} converts to ${returnNum} ${returnUnitSpelled}`;
  };
  
}

module.exports = ConvertHandler;