function Annonce(DOMElement) {
  'use strict';

  var Annonce = this;
  this.element = $(DOMElement);
  this.url = this.element.attr('href');
  this.pageHTML = null;
  this.properties = [];

  this.addShowButton = function() {
    var $buttonContainer = $('<div />');
    $buttonContainer.addClass('show-more-enhanced');
    var $showButton = $('<button>Voir plus</button>');
    $buttonContainer.append($showButton);
    this.element.find('.saveAd').append($buttonContainer);
  };

  this.getAnnonce = function() {
    return $.get(Annonce.url).then(function(data) {
      Annonce.pageHTML = data;
      return data;
    }, function(error) {
      console.error("An error has occured !", error);
      return null;
    })
  };

  this.getPropertiesFromHtml = function() {
    var properties = [];
    var tmpDocument = document.createElement('html');
    tmpDocument.innerHTML = Annonce.pageHTML;
    var informations = tmpDocument.getElementsByTagName('body')[0]
      .getElementsByClassName('properties')[0]
      .getElementsByClassName('line');
    _.forEach(informations, function(line) {
      var propertyHtml = line.getElementsByClassName('property');
      var valueHtml = line.getElementsByClassName('value');

      if(propertyHtml.length === 1 && valueHtml.length === 1) {
        Annonce.properties.push({
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
    _.forEach(Annonce.properties, function(property) {
      var currentLine = $line.clone();
      var currentProperty = $cell.clone();
      currentProperty.html(property.property);
      var currentValue = $cell.clone();
      currentValue.html(property.value);
      currentLine.append(currentProperty).append(currentValue);
      $content.append(currentLine);
    });
    return $content;
  };

  this.getAnnonce().then(function(data) {
    if(data !== null) {
      Annonce.element.data('retreive', true);
      Annonce.element.data('annonce', Annonce);
      Annonce.getPropertiesFromHtml();
      var enhancedPopup = new EnhancedPopup();
      enhancedPopup.setDomElementContent(Annonce.propertiesToDOM());
      enhancedPopup.showPopup(Annonce.element);
    }
  });
};

Annonce.prototype.addShowButton = function () {
  'use strict';
  
  var $buttonContainer = $('<div />');
  $buttonContainer.addClass('show-more-enhanced');
  var $showButton = $('<button>Voir plus</button>');
  $buttonContainer.append($showButton);
  $('.saveAd').append($buttonContainer);
};
