function EnhancedPopup() {
  'use strict';

  var EnhancedPopup = this;
  this.toClassSelector = function(cssClass) {
    return '.' + cssClass;
  };
  this.C = {
    ENHANCED_POPUP_CLASS: 'enhanced-popup',
    ENHANCED_POPUP_CLOSE_CLASS: 'enhanced-popup-close',
    ENHANCED_POPUP_CLOSE_TEXT: 'Fermer',
    ENHANCED_POPUP_CONTENT_CLASS: 'enhanced-popup-content',
  };

  this.buildPopup = function() {
    var $div = $('<div />');

    var $container = $div.clone();
    $container.addClass(this.C.ENHANCED_POPUP_CLASS);
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
    $close.addClass(this.C.ENHANCED_POPUP_CLOSE_CLASS)
      .text(this.C.ENHANCED_POPUP_CLOSE_TEXT);
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
    $content.addClass(this.C.ENHANCED_POPUP_CONTENT_CLASS);
    $content.css({
      color: '#222'
    });

    $container.append($close).append($content);
    $('body').append($container);

    $(this.toClassSelector(this.C.ENHANCED_POPUP_CLOSE_CLASS)).on('click', function(e) {
      $(EnhancedPopup.toClassSelector(EnhancedPopup.C.ENHANCED_POPUP_CLASS)).hide();
      e.preventDefault();
    });
  };

  this.setHTMLContent = function(content) {
    $(this.toClassSelector(this.C.ENHANCED_POPUP_CONTENT_CLASS)).html(content);
  };

  this.setDomElementContent = function(DOMElement) {
    $(this.toClassSelector(this.C.ENHANCED_POPUP_CONTENT_CLASS)).empty().append(DOMElement);
  }

  this.showPopup = function(DOMElement) {
    var documentWidth = $(document).width();
    var supposedXPosition = DOMElement.offset().left + DOMElement.outerWidth();
    if(documentWidth - supposedXPosition >= 400)
      $(EnhancedPopup.toClassSelector(this.C.ENHANCED_POPUP_CLASS)).css({
        left: supposedXPosition,
        right: 'auto'
      });
    else {
      $(EnhancedPopup.toClassSelector(this.C.ENHANCED_POPUP_CLASS)).css({
        left: 'auto',
        right: documentWidth - DOMElement.offset().left
      });
    }

    $(EnhancedPopup.toClassSelector(this.C.ENHANCED_POPUP_CLASS)).css('top', DOMElement.offset().top).show();
  }

  if($(EnhancedPopup.toClassSelector(this.C.ENHANCED_POPUP_CLASS)).length === 0)
    this.buildPopup();
};
