function Enhanced() {
  'use strict';

  var context = this;
  this.pageAnnonces = [];

  this.init = function() {
    var selector = cssHelper.toClassSelector(constants.get('ANNONCE_MAIN_LIST_CLASS')) + ' '
      + cssHelper.toClassSelector(constants.get('ANNONCE_ITEMS_CLASS'));
    $(selector).each(function() {
      var currentAnnonce = new Annonce();
      currentAnnonce.init($(this));
      context.pageAnnonces.push(currentAnnonce);
    });
  };

  this.getPageAnnonceByUrl = function(url) {
    return _.find(context.pageAnnonces, function(annonce) {
      return annonce.url === url;
    });
  };

  this.bindSaveButton = function() {
    var selector = cssHelper.toClassSelector(constants.get('ANNONCE_ITEMS_CLASS')) + ' '
      + cssHelper.toClassSelector(constants.get('BUTTON_SAVE_CLASS'));
    var eventName = 'click';

    $(selector).on(eventName, function(e) {
      var annonce = $(this).parents(cssHelper.toClassSelector(constants.get('ANNONCE_ITEMS_CLASS')));

      e.preventDefault();
    });
  };

  this.init();
  this.bindSaveButton();
};
