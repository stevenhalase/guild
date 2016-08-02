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

    $urlRouterProvider.otherwise('/');
  }

angular.module('guildApp')
  .controller('indexCtrl', indexController)

  indexController.$inject = ['$http'];

  function indexController ($http) {
    const iCtrl = this;
    iCtrl.title = 'Index Controller';
    iCtrl.showSignIn = true;

    iCtrl.login = function () {
      $http({
        url: '/login',
        method: 'POST',
        data: {
          email: iCtrl.loginEmail,
          password: iCtrl.loginPassword
        }
      }, function(response) {
        console.log(response);
      })
    }
  }
