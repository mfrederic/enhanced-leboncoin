const C = {
  LEBONCOIN_ANNONCE_ITEMS_CLASS: 'list_item'
};

function toClassSelector(cssClass) {
  return '.' + cssClass;
}

jQuery(document).ready(function($) {
  'use strict';

  var enhancedPopup = new EnhancedPopup();
  // TODO: Mettre cette fonctionnalité autre part
  var $showButton = $('<button>Enhanced Leboncoin</button>');
  $showButton.addClass('show-more-enhanced button-white').css({
    position: 'absolute',
    right: 5,
    bottom: 5,
    width: 150,
    padding: 0,
    height: 20,
    lineHeight: '20px'
  });
  $(toClassSelector(C.LEBONCOIN_ANNONCE_ITEMS_CLASS)).append($showButton);
  // TODO: FIN

  $(toClassSelector(C.LEBONCOIN_ANNONCE_ITEMS_CLASS) + " .show-more-enhanced").on('click', function(e) {
    var element = $(this).parents(toClassSelector(C.LEBONCOIN_ANNONCE_ITEMS_CLASS));
    if(element.data('retreive') === undefined) {
      new Annonce(element);
    } else {
      enhancedPopup.setDomElementContent(element.data('annonce').propertiesToDOM());
      enhancedPopup.showPopup(element);
    }
    e.preventDefault();
  });
});
