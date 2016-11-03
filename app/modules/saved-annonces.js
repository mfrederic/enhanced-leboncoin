function SavedAnnonces() {
  'use strict';
  var context = this;

  this.init = function() {
    this.buildSavedAnnonce();
    this.populateSavedAnnonce();
    this.updateAnnonceCount();
  };

  this.populateSavedAnnonce = function() {
    var annonceListContainer = $(cssHelper.toClassSelector(constants.get('SAVED_ANNONCE_CONTAINER_CLASS')));
    annonceListContainer.empty();
    _.forEach(savedAnnonces, function(annonce) {
      annonceListContainer.append(context.toHtmlSavedAnnonce(annonce));
    });
    context.updateAnnonceCount();
  };

  this.updateAnnonceCount = function() {
    var savedPopup = $(cssHelper.toClassSelector(constants.get('SAVED_ANNONCE_POPUP_CLASS')));
    savedPopup.find('h1 span').text(' (' + savedAnnonces.length +')')
  };

  this.toHtmlSavedAnnonce = function(annonce) {
    var annonceContainer = htmlHelper.div();
    annonceContainer.css('position', 'relative').attr('class', constants.get('SAVED_ANNONCE_CLASS'));
    var annonceTitle = htmlHelper.h(3, '');
    annonceTitle.css({
      padding: '0 0.5rem',
      marginBottom: 0
    });
    var annonceTitleContent = htmlHelper.a(annonce.url, annonce.name, constants.get('SAVED_ANNONCE_LINK_TITLE'));
    annonceTitleContent.attr('target', '_blank');
    annonceTitle.append(annonceTitleContent);

    var annonceDate = htmlHelper.p();
    annonceDate.html(
      moment(annonce.date._d).fromNow()
      + constants.get('SAVED_ANNONCE_INFOS_SEPARATOR') + '<em>' + annonce.category + '</em>'
      + '<br /><em>' + annonce.location + '</em>'
    ).css({
      marginBottom: '0.5rem',
      padding: '0 0.5rem 0.5rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.3)'
    });

    var annoncePrice = htmlHelper.span();
    annoncePrice.text(annonce.price)
    .css({
      position: 'absolute',
      top: 0, right: 0,
      padding: '0.5rem',
      color: '#f56b2a'
    });

    var annonceUnsave = htmlHelper.a('#', constants.get('SAVED_ANNONCE_REMOVE_TEXT'), constants.get('SAVED_ANNONCE_REMOVE_TITLE'));
    annonceUnsave.css({
      position: 'absolute',
      bottom: 0, right: 0,
      padding: '0.5rem',
      color: 'red',
      fontSize: 'smaller'
    }).on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var element = $(this);

      savedAnnonces = _.remove(savedAnnonces, function(eachAnnonce) {
        return eachAnnonce.id != annonce.id;
      });
      chrome.storage.local.set({ 'savedAnnonces': savedAnnonces }, function() {
        if(chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          context.updateAnnonceCount();
          element.parent('div.saved-annonce').remove();
        }
      });
    });

    annonceContainer.append(annonceTitle).append(annonceDate).append(annoncePrice).append(annonceUnsave);
    return annonceContainer;
  };

  this.buildSavedAnnonce = function() {
    var $mainContainer = htmlHelper.div();
    $mainContainer.attr('class', constants.get('SAVED_ANNONCE_POPUP_CLASS'))
      .css({
        backgroundColor: 'rgba(255, 255, 255, 0.90)',
        borderRight: '1px solid rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
        width: 400,
        zIndex: 9998,
        position: 'fixed',
        top: 60, left: -400, bottom: 0
      });

    var $title = htmlHelper.h(1, constants.get('SAVED_ANNONCE_TEXT') + '<span></span>');
    $title.css({
      padding: '0.5rem',
      margin: 0,
      position: 'relative'
    });

    var $toggleButton = htmlHelper.button('>');
    $toggleButton.attr('class', 'button-blue')
      .attr('title', constants.get('SAVED_ANNONCE_BUTTON_TITLE'))
      .css({
        position: 'absolute',
        top: 0, right: -41,
        borderRadius: '0 0 4px 0',
        padding: '0 0.5rem',
        fontSize: 20
      })
      .on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var element = $(this);
        var savedPopup = $(cssHelper.toClassSelector(constants.get('SAVED_ANNONCE_POPUP_CLASS')));

        var savedContainer = $(cssHelper.toClassSelector(constants.get('SAVED_ANNONCE_CONTAINER_CLASS')));
        savedContainer.css('height', savedPopup.height() - savedPopup.find('h1').outerHeight())

        if(savedPopup.hasClass(constants.get('SAVED_ANNONCE_VISIBLE_CLASS'))) {
          element.text('>');
          savedPopup.removeClass(constants.get('SAVED_ANNONCE_VISIBLE_CLASS')).addClass(constants.get('SAVED_ANNONCE_HIDDEN_CLASS'))
            .stop().animate({left: -400}, 'fast');
        } else {
          context.populateSavedAnnonce();
          element.text('<');
          savedPopup.removeClass(constants.get('SAVED_ANNONCE_HIDDEN_CLASS')).addClass(constants.get('SAVED_ANNONCE_VISIBLE_CLASS'))
            .stop().animate({left: 0}, 'fast');
        }
      });

    var $listAnnonce = htmlHelper.div();
    $listAnnonce.attr('class', constants.get('SAVED_ANNONCE_CONTAINER_CLASS'))
      .css({
        width: '100%',
        height: '100%',
        overflow: 'auto'
      });

    $mainContainer.append($title).append($toggleButton).append($listAnnonce);
    $('body').append($mainContainer);
  };
};
