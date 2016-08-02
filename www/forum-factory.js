'use strict'
angular.module('guildApp')
  .factory('forumFactory', forumFactory);

  forumFactory.$inject = ['$http'];

  function forumFactory($http) {

    function getForum() {
      return $http.get('/api/forum');
    }

    function saveForum(forumObj) {
      return $http.post('/api/forum', { data: forumObj })
    }

    function getSection(id) {
      return $http.get('/api/forum' + id);
    }

    return {
      getForum : getForum,
      saveForum : saveForum,
      getSection : getSection
    };
  }
