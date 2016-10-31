function Enhanced() {
  'use strict';

  var enhancedPopup = new EnhancedPopup();
  var emptyAnnonce = new Annonce();
  emptyAnnonce.addShowButton();

  $(cssHelper.toClassSelector(constants.get('LEBONCOIN_ANNONCE_ITEMS_CLASS')) + ' '
    + cssHelper.toClassSelector(constants.get('ENHANCED_BUTTON_CLASS'))).on('click', function(e) {
    var element = $(this).parents(cssHelper.toClassSelector(constants.get('LEBONCOIN_ANNONCE_ITEMS_CLASS')));
    if(element.data('retreive') === undefined) {
      new Annonce(element);
    } else {
      enhancedPopup.setDomElementContent(element.data('annonce').propertiesToDOM());
      enhancedPopup.showPopup(element);
    }
    e.preventDefault();
  });
};
