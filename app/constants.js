function Constants() {
  'use strict';
};

Constants.prototype.get = function (valueName) {
  var constants = {
    ANNONCE_ID_REGEX: '^[\\/]{2}[w]{3}\\.leboncoin\\.fr\\/[^\\d]+([\\d]+)\.[\\d\\D]+$',
    ANNONCE_STRING_DATE_REGEX: /[a-z\'\s,]+([0-9]{2}):([0-9]{2})/gi,
    ANNONCE_DATE_REGEX: /([0-9]{1,2})\s([a-z]+)[,\s]+([0-9]{2}):([0-9]{2})/gi,
    BUTTON_BAR_CLASS: 'enhanced-buttons-bar',
    BUTTON_SHOW_MORE_CLASS: 'show-more-enhanced',
    BUTTON_SAVE_CLASS: 'save-enhanced',

    BUTTON_SAVE_TITLE: 'Sauvegarder l\'annonce.',

    POPUP_CLASS: 'enhanced-popup',
    POPUP_CLOSE_CLASS: 'enhanced-popup-close',
    POPUP_CLOSE_TEXT: 'Fermer',
    POPUP_CONTENT_CLASS: 'enhanced-popup-content',

    SAVED_ANNONCE_POPUP_CLASS: 'saved-annonces',
    SAVED_ANNONCE_VISIBLE_CLASS: 'saved-annonces-visible',
    SAVED_ANNONCE_HIDDEN_CLASS: 'saved-annonces-hidden',
    SAVED_ANNONCE_TEXT: 'Annonces sauvegardées',
    SAVED_ANNONCE_BUTTON_TITLE: 'Afficher/Cacher les annonces sauvegardées',
    SAVED_ANNONCE_CONTAINER_CLASS: 'saved-annonces-list',
    SAVED_ANNONCE_CLASS: 'saved-annonce',
    SAVED_ANNONCE_LINK_TITLE: 'Aller vers l\'annonce',
    SAVED_ANNONCE_INFOS_SEPARATOR: ' dans ',
    SAVED_ANNONCE_REMOVE_TEXT: 'supprimer',
    SAVED_ANNONCE_REMOVE_TITLE: 'Retirer des annonces sauvegardées',

    ANNONCE_MAIN_LIST_CLASS: 'mainList',
    ANNONCE_ITEMS_CLASS: 'list_item',
    ANNONCE_ITEMS_SAVE_CLASS: 'saveAd'
  };

  return constants[valueName];
};
