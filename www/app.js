'use strict'
angular.module('guildApp', ['ui.router'])
  .config(guildRouter);

  guildRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function guildRouter ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url : '/',
        templateUrl: './home/home.html',
        controller : 'homeCtrl as hCtrl'
      })
      .state('registration', {
        url : '/registration',
        templateUrl: './registration/registration.html',
        controller : 'registrationCtrl as rCtrl'
      })
      .state('forum', {
        url : '/forum',
        templateUrl: './forum/forum.html',
        controller : 'forumCtrl as fCtrl'
      })

    $urlRouterProvider.otherwise('/');
  }

angular.module('guildApp')
  .controller('indexCtrl', indexController)

  indexController.$inject = ['$http', 'userFactory'];

  function indexController ($http, userFactory) {
    const iCtrl = this;
    iCtrl.title = 'Index Controller';
    iCtrl.showSignIn = true;
    iCtrl.userLoggedIn = false;
    userFactory.getUser()
      .then(function(response) {
        console.log(response);
        iCtrl.user = response.data.user;
        console.log('email', iCtrl.user.email)
        if (iCtrl.user.email) {
          iCtrl.userLoggedIn = true;
          iCtrl.showSignIn = true;
        }
      });

    iCtrl.login = function () {
      $http({
        url: '/login',
        method: 'POST',
        data: {
          email: iCtrl.loginEmail,
          password: iCtrl.loginPassword
        }
      })
      .then(function(response) {
        console.log(response);
        userFactory.getUser()
          .then(function(response) {
            console.log(response);
            iCtrl.user = response.data.user;
            console.log('email', iCtrl.user.email)
            if (iCtrl.user.email) {
              iCtrl.userLoggedIn = true;
              iCtrl.showSignIn = true;
            }
          });
      })
    }

    iCtrl.logout = function () {
      $http.get('/logout')
        .then(function(response) {
          iCtrl.userLoggedIn = false;
          iCtrl.showSignIn = true;
        })
    }
  }
