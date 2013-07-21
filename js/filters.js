'use strict';

angular.module('app.filters', []).
  filter('imageSize', function () {
    return function (text, size) {
      if (isNaN(size)){
        size = 'm';
      }
      var i=text.lastIndexOf(".");
      return String([text.slice(0, i), size, text.slice(i)].join(''));
    };
  }).
  filter('subArrays', function () {
    return function (a, b) {
      if (a == undefined){ a = []};
      if (b == undefined){ b = []};
      return a.filter(function ( name ) {
          return b.indexOf( name ) === -1;
      });
    };
  }).
  filter('inCookie', function($cookies) {
      return function(id) {
        if($cookies.tags){
          return $cookies.tags.indexOf(id) !== -1;
        }
      };
  }).
  filter('compareArrays', function() {
      return function(arrA, arrB) {
        if(arrA.length !== arrB.length) return false;
        var cA = arrA.slice().sort().join(","); 
        var cB = arrB.slice().sort().join(",");
        return cA===cB;
      };
  });