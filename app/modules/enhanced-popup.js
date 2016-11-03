function EnhancedPopup() {
  'use strict';
  var context = this;

  this.currentAnnonceId = null;

  this.init = function() {
    var popupInDom = $(cssHelper.toClassSelector(constants.get('POPUP_CLASS')));
    if(popupInDom.length === 0) {
      context.buildPopup();
    }
  };

  this.setCurrentAnnonceId = function(id) {
    context.currentAnnonceId = id;
  };

  this.buildPopup = function() {
    var $div = $('<div />');

    var $container = $div.clone();
    $container.addClass(constants.get('POPUP_CLASS'))
      .css({
        display: 'none',
        overflow: 'auto',
        position: 'absolute',
        zIndex: 9998,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
        maxWidth: 400
      });

    var $close = $('<button />');
    $close.addClass(constants.get('POPUP_CLOSE_CLASS'))
      .text(constants.get('POPUP_CLOSE_TEXT'))
      .css({
        display: 'block',
        width: '100%',
        padding: '5px 0',
        textAlign: 'center',
        backgroundColor: '#f56b2a',
        color: '#FFF',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer'
      }).on('click', function(e) {
        context.hide();
        e.preventDefault();
      });

    var $content = $div.clone();
    $content.addClass(constants.get('POPUP_CONTENT_CLASS'))
      .css({
        color: '#222'
      });

    var $credits = htmlHelper.span();
    $credits.html('enhanced leboncoin par <a target="_blank" style="color: rgba(0, 0, 0, 0.1);" href="https://github.com/mfrederic">mfrederic</a>')
      .css({
        position: 'absolute',
        bottom: 0, left: 0,
        padding: '0.3rem',
        color: 'rgba(0, 0, 0, 0.1)',
        fontSize: 8
      });

    $container.append($close).append($content).append($credits);
    $('body').append($container);

    return $container;
  };

  this.hide = function() {
    $(cssHelper.toClassSelector(constants.get('POPUP_CLASS'))).hide();
  };

  this.setHTMLContent = function(content) {
    $(cssHelper.toClassSelector(constants.get('POPUP_CONTENT_CLASS'))).html(content);
  };

  this.setDomElementContent = function(DOMElement) {
    $(cssHelper.toClassSelector(constants.get('POPUP_CONTENT_CLASS'))).empty().append(DOMElement);
  }

  this.isSameVisible = function(id) {
    if(id === context.currentAnnonceId) {
      return $(cssHelper.toClassSelector(constants.get('POPUP_CLASS'))).is(':visible');
    } else {
      return false;
    }
  },

  this.showPopup = function(DOMElement) {
    var documentWidth = $(document).width();
    var supposedXToLeftPosition = DOMElement.offset().left + DOMElement.outerWidth();
    var supposedXToRightPosition = documentWidth - DOMElement.offset().left;
    if(documentWidth - supposedXToLeftPosition >= 400)
      $(cssHelper.toClassSelector(constants.get('POPUP_CLASS'))).css({
        width: 400,
        left: supposedXToLeftPosition,
        right: 'auto'
      });
    else if(supposedXToRightPosition > 400) {
      $(cssHelper.toClassSelector(constants.get('POPUP_CLASS'))).css({
        width: documentWidth - supposedXToLeftPosition - 10,
        left: supposedXToLeftPosition,
        right: 'auto'
      });
    } else {
      $(cssHelper.toClassSelector(constants.get('POPUP_CLASS'))).css({
        width: 400,
        left: 'auto',
        right: documentWidth - DOMElement.offset().left
      });
    }

    $(cssHelper.toClassSelector(constants.get('POPUP_CLASS'))).css('top', DOMElement.offset().top).show();
  }

  this.init();
};
