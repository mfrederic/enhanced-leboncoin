function HtmlHelper() {
  'use strict';
  var context = this;

  this.objects = {
    'div': $('<div />'),
    'span': $('<span />'),
    'a': $('<a />'),
    'p': $('<p />'),
    'button': $('<button />'),
    'formular': $('<form />'),
    'table': $('<table />'),
    'tr': $('<tr />'),
    'td': $('<td />'),
    'th': $('<th />'),
    'h1': $('<h1 />'),
    'h2': $('<h2 />'),
    'h3': $('<h3 />'),
    'h4': $('<h4 />'),
    'h5': $('<h5 />'),
    'ul': $('<ul />'),
    'ol': $('<ol />'),
    'li': $('<li />')
  };

  this.div = function() {
    return context.objects.div.clone();
  };

  this.span = function() {
    return context.objects.span.clone();
  };

  this.a = function(href, text, title) {
    href = (_.isEmpty(href)) ? '' : href;
    text = (_.isEmpty(text)) ? '' : text;
    title = (_.isEmpty(title)) ? '' : title;
    var a = context.objects.a.clone();
    a.text(text).attr('href', href).attr('title', title);
    return a;
  };

  this.p = function() {
    return context.objects.p.clone();
  };

  this.button = function(text) {
    var button = context.objects.button.clone();
    button.text(text);
    return button;
  };

  this.formular = function() {
    return context.objects.formular.clone();
  };

  this.table = function() {
    return context.objects.table.clone();
  };

  this.tr = function() {
    return context.objects.tr.clone();
  };

  this.td = function() {
    return context.objects.td.clone();
  };

  this.th = function() {
    return context.objects.th.clone();
  };

  this.ul = function() {
    return context.objects.ul.clone();
  };

  this.ol = function() {
    return context.objects.ol.clone();
  };

  this.li = function() {
    return context.objects.li.clone();
  };

  this.h = function(indice, text) {
    var title = context.objects['h'+indice].clone();
    title.html(text);
    return title;
  };
};
