'use strict';

angular.module('app.controllers', []).
  controller('app', ['$scope','$route', function($scope,$route) {
    
    //Listener for route change. Here I am dynamically setting title and template.
    $scope.$on("$routeChangeSuccess",function( $currentRoute, $previousRoute ){
      $scope.title = $route.current.title;
      $scope.template = $route.current.template;
    });
  }]).
  controller('Albums', ['$scope', 'Albums', 'inCookieFilter', function($scope, Albums, inCookieFilter) {

    //Sync search params and values with cookie.
    Albums.updateSearch();
    Albums.updateLocal();

    //Toggle on/off tag values.
    $scope.filterAlbum = function(id) {
      Albums.toggle(id);
    };

    //Filter in ng-class that returns true or false.
    $scope.taggedA = function(id){
      return inCookieFilter(id);
    };

    //Filter in ng-repeat that returns the item it was passed if true.
    $scope.taggedB = function(album){
      return (inCookieFilter(album.id))?album:null;
    };
    
    //Listeners for updating values through $broadcast in a callback.
    $scope.$on('albumsUpdated',function(){
      $scope.albums = Albums.returnAlbumsFetched();
      console.log($scope.albums);
    });
    $scope.$on('albumsListUpdated',function(){
      $scope.albumsList = Albums.returnAlbumsList();
    });

    //We dont want to lose our values when returning from another tab.
    $scope.albumsList = Albums.returnAlbumsList();
    $scope.albums = Albums.returnAlbumsFetched();
  }]).
  controller('Header', ['$scope', function($scope) {
    
    //Used for Bootstrap to make navbar default closed when viewport shrinks.
    $scope.isCollapsed = true;
  }]);