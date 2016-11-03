'use strict';
const constants = new Constants();
const cssHelper = new CssHelper();
const htmlHelper = new HtmlHelper();
const dateHelper = new DateHelper();
var enhancedPopup = new EnhancedPopup();
var savedAnnoncesView = new SavedAnnonces();
var savedAnnonces = [];

moment.locale('fr');

function prepareStorage() {
  chrome.storage.local.set({
    'savedAnnonces': []
  }, function() {
    if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
    console.log('test');
    new Enhanced();
    savedAnnoncesView.init();
  });
};

$(function() {
  chrome.storage.local.get(null, function(results) {
    if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      if(_.isEmpty(results) || results.savedAnnonces.length < 0) {
        prepareStorage();
      } else {
        savedAnnonces = results.savedAnnonces;
        new Enhanced();
        savedAnnoncesView.init();
      }
    }
  });

});
