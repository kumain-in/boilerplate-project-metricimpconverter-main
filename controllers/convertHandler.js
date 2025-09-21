function ConvertHandler() {
  
  this.getNum = function(input) {
    // Find the index of the first alphabetical character to isolate the number part.
    let numEndIndex = input.search(/[a-zA-Z]/);
    let numStr = (numEndIndex === -1) ? input : input.slice(0, numEndIndex);

    // If no number is provided (e.g., "kg"), default to 1.
    if (numStr.length === 0) {
      return 1;
    }

    // Check for fractions.
    let parts = numStr.split('/');
    
    // If it's a double fraction (e.g., "3/2/3"), it's an invalid number.
    if (parts.length > 2) {
      return 'invalid number';
    }
    
    let result;
    // If it's a fraction, calculate its decimal value.
    if (parts.length === 2) {
      result = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      // Otherwise, parse it as a standard number.
      result = parseFloat(parts[0]);
    }

    // If the result is not a number, it's invalid.
    if (isNaN(result)) {
      return 'invalid number';
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    // Find the index of the first alphabetical character to isolate the unit part.
    let unitStartIndex = input.search(/[a-zA-Z]/);
    
    // If no alphabetical characters are found, it's an invalid unit.
    if (unitStartIndex === -1) {
      return 'invalid unit';
    }
    
    let unit = input.slice(unitStartIndex).toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    // Special case for liters, which should be returned as 'L'.
    if (unit === 'l') {
      return 'L';
    }
    
    // Check if the extracted unit is in the list of valid units.
    if (validUnits.includes(unit)) {
      return unit;
    }
    
    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    if (!initUnit) return 'invalid unit';
    
    const unitMap = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    // Return the corresponding unit from the map.
    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    if (!unit) return '';

    const spellMap = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    // Return the full name of the unit.
    return spellMap[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (!initUnit) return null;
    
    // Perform the conversion based on the initial unit.
    switch (initUnit.toLowerCase()) {
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
      default:
        result = null; // Should not happen with validation
    }
    
    // Round the result to 5 decimal places.
    return result ? parseFloat(result.toFixed(5)) : null;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Get the spelled-out versions of the units.
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);
    
    // Construct the final string.
    return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
  };
  
}

module.exports = ConvertHandler;