'use strict';

angular.module('app.services', ['ngResource']).
  factory('Albums', function($cookies, $location, inCookieFilter, $imgurAlbum, $imgurAccount, subArraysFilter, compareArraysFilter, $rootScope) {
    var albums = {},
        tagsNew = [],
        tagsOld = [],
        albumsFetched = [],
        albumsList = [];

    //Here we are fetching albumList once when it's injected into controller.
    var imgurAccount = $imgurAccount.imgurAccount();
    imgurAccount.getAccountAlbums(function(value){
      //Set albumList equal to the value in the callback.
      albumsList = value;
      //Let the world know how much you rock.
      $rootScope.$broadcast('albumsListUpdated');
    });
    
    albums.updateSearch = function() {
      //Are there cookies set?
      if($cookies.tags){
        //Is user coming to the site with a URL?
        if($location.search().tags){
          //Replace cookies search parameters.
          $cookies.tags = $location.search().tags;
        }
        else{
          //Sync search with cookie.
          $location.search({
            tags:$cookies.tags
          });
        }
      }
    };

    albums.toggle = function(id) {
      //Cookies have string arrays.
      var cookie = ($cookies.tags)?$cookies.tags.split(','):[];
      //Is the ID in the cookie array?
      if(inCookieFilter(id)){
        //Toggle OFF, remove the ID.
        cookie.splice(cookie.indexOf(id), 1);
        $cookies.tags = cookie.join();
      }
      else{
        //Toggle ON, add the ID.
        cookie.push(id);
        $cookies.tags = cookie.join();
      }
      //If there are tags add them to search, else remove tags parameter.
      $location.search(($cookies.tags)?{tags:$cookies.tags}:{});
      //Update local values.
      albums.updateLocal();
    };
    
    albums.updateLocal = function(){
      //Cookie have string arrays.
      var tags = ($cookies.tags)?$cookies.tags.split(','):[];
      //Is the local array equal to the cookie array?
      if(!compareArraysFilter(tags,tagsNew)){
        //Find new tags by subtracting those in cookie and against old incase previously fetched.
        tagsNew = subArraysFilter(subArraysFilter(tags, tagsNew), tagsOld);
        //Fetch new tags.
        var imgurAlbum = $imgurAlbum.imgurAlbum({albumList:tagsNew});
        imgurAlbum.getAlbum(function(value){
          value.forEach(function(album){
            //Push new albums.
            albumsFetched.push(album);
            //Keep track of previously fetched.
            tagsOld.push(album.id);
          });
          //When you are done, sync local array with cookie array.
          tagsNew = tags;
          //Let the world know how much you rock.
          $rootScope.$broadcast('albumsUpdated');
        });
      }
    }
    
    albums.returnAlbumsFetched = function() {
      return albumsFetched;
    };

    albums.returnAlbumsList = function() {
      return albumsList;
    };
    
    return albums;
  });