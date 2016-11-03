function Storage() {
  'use strict';

  var context = this;
  this.lastItem = undefined;

  this.getItem = function(itemKey, defaultValue) {
    defaultValue = (_.isUndefined(defaultValue)) ? null : defaultValue;
    return browser.storage.local.get(itemKey).then(function(item) {
      return item;
    });
  };

  this.getLastItem = function() {
    return context.lastItem;
  };

  this.setItem = function(itemKey, itemValue) {
    var item = {};
    item[itemKey] = itemValue;
    chrome.storage.local.set(item, function() {
      return chrome.runtime.lastError;
    });
  };

  this.setItems = function(items) {
    return browser.storage.local.set(items).then(function(response) {
      console.log(response);
      return response;
    });
  };

  this.clear = function() {
    chrome.storage.local.clear();
  };

  return this;
};
