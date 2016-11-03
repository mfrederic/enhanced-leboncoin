function DateHelper() {
  'use strict';
  var context = this;

  this.stringMonthToNumber = function(stringMonth) {
    var months = {
      'janv': 0,
      'fevr': 1,
      'mars': 2,
      'avr': 3,
      'mai': 4,
      'juin': 5,
      'juill': 6,
      'aout': 7,
      'sept': 8,
      'oct': 9,
      'nov': 10,
      'dec': 11
    };
    return months[_.deburr(stringMonth)];
  };

  this.toDate = function(stringDate) {
    var regex = null;
    var match = null;
    var annonceDate = moment();
    if(stringDate.indexOf('Aujourd\'hui') !== -1) {
      regex = constants.get('ANNONCE_STRING_DATE_REGEX');
      match = regex.exec(stringDate);
      annonceDate.hour(match[1]).minute(match[2]);
    } else if(stringDate.indexOf('Hier') !== -1) {
      regex = constants.get('ANNONCE_STRING_DATE_REGEX');
      match = regex.exec(stringDate);
      annonceDate.hour(match[1]).minute(match[2]);
    } else {
      regex = constants.get('ANNONCE_DATE_REGEX');
      match = regex.exec(stringDate);
      annonceDate.date(match[1]).month(context.stringMonthToNumber(match[2])).hour(match[3]).minute(match[4]);
    }
    return annonceDate;
  };
};
