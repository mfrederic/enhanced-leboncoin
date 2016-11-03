function Annonce() {
  'use strict';
  var context = this;

  this.id = null;
  this.infos = {};
  this.retreive = false;
  this.element = null;
  this.url = null;
  this.pageHTML = null;
  this.properties = [];
  this.isSaved = false;

  this.init = function(DOMElement) {
    context.element = DOMElement;
    context.url = context.element.attr('href');
    var regex = new RegExp(constants.get('ANNONCE_ID_REGEX'));
    var match = regex.exec(context.url);
    context.id = match[1];

    context.infos = {
      id: context.id,
      url: context.url,
      name: _.trim(context.element.find('.item_title').text()),
      category: _.trim(context.element.find('p.item_supp:eq(0)').text()),
      location: _.trim(context.element.find('p.item_supp:eq(1)').text()),
      price: _.trim(context.element.find('.item_price').text()),
      date: dateHelper.toDate(_.trim(context.element.find('p.item_supp:eq(2)').text()))
    };
    console.log(context);
    context.pageHTML = null;
    context.properties = [];

    var saveFind = _.find(savedAnnonces, function(annonce) {
      return annonce.id == context.id;
    });
    context.isSaved = !_.isUndefined(saveFind);

    context.buildButtons();
    return context;
  };

  this.getAnnonce = function() {
    return $.get(context.url).then(function(data) {
      context.pageHTML = data;
      context.retreive = true;
      return data;
    }, function(error) {
      console.error("An error has occured !", error);
      return null;
    })
  };

  this.getPropertiesFromHtml = function() {
    var properties = [];
    var tmpDocument = document.createElement('html');
    tmpDocument.innerHTML = context.pageHTML;
    var informations = tmpDocument.getElementsByTagName('body')[0]
      .getElementsByClassName('properties')[0]
      .getElementsByClassName('line');
    _.forEach(informations, function(line) {
      var propertyHtml = line.getElementsByClassName('property');
      var valueHtml = line.getElementsByClassName('value');

      if(propertyHtml.length === 1 && valueHtml.length === 1) {
        context.properties.push({
          property: _.trim(propertyHtml[0].innerHTML),
          value: _.trim(valueHtml[0].innerHTML)
        });
      }
    })
    return properties;
  };

  this.propertiesToDOM = function() {
    var $content = $('<table />');
    var $line = $('<tr />');
    var $cell = $('<td />');
    _.forEach(context.properties, function(property) {
      var currentLine = $line.clone();
      var currentProperty = $cell.clone();
      currentProperty.attr('style', 'width: 35%;')
      currentProperty.html(property.property);
      var currentValue = $cell.clone();
      currentValue.html(property.value);
      currentLine.append(currentProperty).append(currentValue);
      $content.append(currentLine);
    });
    return $content;
  };

  this.buildButtons = function() {
    var $clearDiv = $('<div />');
    $clearDiv.css({
      clear: 'both',
      display: 'block',
      width: '100%',
      height: '1px'
    });
    context.element.append($clearDiv);

    var $buttonsBar = $('<div />');
    $buttonsBar.addClass(constants.get('BUTTON_BAR_CLASS')).css({
      marginTop: 10,
      height: 20
    });

    var $saveButton = $('<button></button>');
    var btnType = (context.isSaved) ? 'button-blue' : 'button-white';
    $saveButton.attr('title', constants.get('BUTTON_SAVE_TITLE'))
      .addClass(constants.get('BUTTON_SAVE_CLASS') + ' ' + btnType)
      .css({
        padding: 0,
        marginRight: 5,
        height: 20,
        lineHeight: '20px'
      })
      .on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var element = $(this);

        if(context.isSaved) {
          context.isSaved = false;
          savedAnnonces = _.remove(savedAnnonces, function(annonce) {
            return annonce.id != context.id;
          });
        } else {
          context.isSaved = true;
          savedAnnonces.push(context.infos);
        }
        chrome.storage.local.set({ 'savedAnnonces': savedAnnonces }, function() {
          if(chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            if(!context.isSaved) {
              element.removeClass('button-blue').addClass('button-white');
            } else {
              element.removeClass('button-white').addClass('button-blue');
            }
          }
        });
      })
      .append('<i class="icon-star" style="margin-right: 0;"></i>');
    $buttonsBar.append($saveButton);

    var $showButton = $('<button>Enhanced Leboncoin</button>');
    $showButton.addClass(constants.get('BUTTON_SHOW_MORE_CLASS') + ' button-white')
      .css({
        width: 150,
        padding: 0,
        marginRight: 5,
        height: 20,
        lineHeight: '20px'
      }).on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();

        if(enhancedPopup.isSameVisible(context.id)) {
          enhancedPopup.hide();
          return;
        }

        if(!context.retreive) {
          context.getAnnonce().then(function(data) {
            if(data !== null) {
              context.element.data('retreive', true);
              context.element.data('annonce', context);
              context.getPropertiesFromHtml();
              context.buildPopup();
            }
          });
        } else {
          context.buildPopup();
        }
      });

    this.buildPopup = function() {
      enhancedPopup.setDomElementContent(context.propertiesToDOM());
      enhancedPopup.showPopup(context.element);
      enhancedPopup.setCurrentAnnonceId(context.id);
    };

    $buttonsBar.append($showButton);
    context.element.append($buttonsBar);
  };
};
