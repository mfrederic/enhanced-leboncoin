function Constants() {
  'use strict';
};

Constants.prototype.get = function (valueName) {
  var constants = {
    ENHANCED_BUTTON_CLASS: 'show-more-enhanced',
    ENHANCED_POPUP_CLASS: 'enhanced-popup',
    ENHANCED_POPUP_CLOSE_CLASS: 'enhanced-popup-close',
    ENHANCED_POPUP_CLOSE_TEXT: 'Fermer',
    ENHANCED_POPUP_CONTENT_CLASS: 'enhanced-popup-content',

    LEBONCOIN_ANNONCE_ITEMS_CLASS: 'list_item'
  };

  return constants[valueName];
};
