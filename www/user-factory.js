'use strict'
angular.module('guildApp')
  .factory('userFactory', userFactory);

  userFactory.$inject = ['$http'];

  function userFactory($http) {

    let currentUser = {};

    function getUser() {
      return $http.get('/api/me/');
    }

    return {
      getUser : getUser,
      currentUser : currentUser
    };
  }
