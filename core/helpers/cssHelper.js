function CssHelper() {
  'use strict';
};

CssHelper.prototype.toClassSelector = function (cssClass) {
  return '.' + cssClass;
};

CssHelper.prototype.toIdSelector = function (cssId) {
  return '.' + cssId;
};
