function ConvertHandler() {
  
  this.getNum = function(input) {
    let numEndIndex = input.search(/[a-zA-Z]/);
    let numStr = (numEndIndex === -1) ? input : input.slice(0, numEndIndex);

    if (numStr.length === 0) {
      return 1;
    }

    let parts = numStr.split('/');
    
    if (parts.length > 2) {
      return 'invalid number';
    }
    
    let result;
    if (parts.length === 2) {
      result = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      result = parseFloat(parts[0]);
    }

    if (isNaN(result)) {
      return 'invalid number';
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let unitStartIndex = input.search(/[a-zA-Z]/);
    
    // If no alphabetical characters are found, it's an invalid unit.
    if (unitStartIndex === -1) {
      return 'invalid unit';
    }
    
    let unit = input.slice(unitStartIndex).toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (unit === 'l') {
      return 'L';
    }
    
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
    
    return spellMap[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (!initUnit) return null;
    
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
        result = null; 
    }
    
    return result ? parseFloat(result.toFixed(5)) : null;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);
    
    return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
  };
  
}

module.exports = ConvertHandler;