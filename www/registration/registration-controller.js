angular.module('guildApp')
  .controller('registrationCtrl', registrationController)

  registrationController.$inject = ['$http'];

  function registrationController ($http) {
    const rCtrl = this;
    rCtrl.title = 'Registration Controller';

    rCtrl.register = function () {
      $http({
        url: '/register',
        method: 'POST',
        data: {
          name: rCtrl.displayName,
          email: rCtrl.email,
          password: rCtrl.password,
          age: rCtrl.age,
          location: rCtrl.location
        }
      }, function(response) {
        console.log(response);
      })
    }
  }
