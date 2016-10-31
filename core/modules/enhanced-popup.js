function EnhancedPopup() {
  'use strict';

  var context = this;

  this.buildPopup = function() {
    var $div = $('<div />');

    var $container = $div.clone();
    $container.addClass(constants.get('ENHANCED_POPUP_CLASS'));
    $container.css({
      display: 'none',
      overflow: 'auto',
      position: 'absolute',
      zIndex: 9998,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
      maxWidth: 400
    });

    var $close = $('<button />');
    $close.addClass(constants.get('ENHANCED_POPUP_CLOSE_CLASS'))
      .text(constants.get('ENHANCED_POPUP_CLOSE_TEXT'));
    $close.css({
      display: 'block',
      width: '100%',
      padding: '5px 0',
      textAlign: 'center',
      backgroundColor: '#f56b2a',
      color: '#FFF',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer'
    });

    var $content = $div.clone();
    $content.addClass(constants.get('ENHANCED_POPUP_CONTENT_CLASS'));
    $content.css({
      color: '#222'
    });

    $container.append($close).append($content);
    $('body').append($container);

    $(cssHelper.toClassSelector(constants.get('ENHANCED_POPUP_CLOSE_CLASS'))).on('click', function(e) {
      $(cssHelper.toClassSelector(constants.get('ENHANCED_POPUP_CLASS'))).hide();
      e.preventDefault();
    });
  };

  this.setHTMLContent = function(content) {
    $(cssHelper.toClassSelector(constants.get('ENHANCED_POPUP_CONTENT_CLASS'))).html(content);
  };

  this.setDomElementContent = function(DOMElement) {
    $(cssHelper.toClassSelector(constants.get('ENHANCED_POPUP_CONTENT_CLASS'))).empty().append(DOMElement);
  }

  this.showPopup = function(DOMElement) {
    var documentWidth = $(document).width();
    var supposedXPosition = DOMElement.offset().left + DOMElement.outerWidth();
    if(documentWidth - supposedXPosition >= 400)
      $(cssHelper.toClassSelector(constants.get('ENHANCED_POPUP_CLASS'))).css({
        left: supposedXPosition,
        right: 'auto'
      });
    else {
      $(cssHelper.toClassSelector(constants.get('ENHANCED_POPUP_CLASS'))).css({
        left: 'auto',
        right: documentWidth - DOMElement.offset().left
      });
    }

    $(cssHelper.toClassSelector(constants.get('ENHANCED_POPUP_CLASS'))).css('top', DOMElement.offset().top).show();
  }

  if($(cssHelper.toClassSelector(constants.get('ENHANCED_POPUP_CLASS'))).length === 0)
    this.buildPopup();
};
