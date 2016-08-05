'use strict'
angular.module('guildApp')
  .controller('forumCtrl', forumController)

  forumController.$inject = ['$http', 'forumFactory'];

  function forumController ($http, forumFactory) {
    const fCtrl = this;
    fCtrl.title = 'Forum Controller';

    fCtrl.forum = [];
    fCtrl.showingCategories = true;
    fCtrl.currentSection = {};
    fCtrl.showingSection = false;

    forumFactory.getForum()
      .then(function(response) {
        console.log(response.data.forum[0])
        fCtrl.forum = response.data.forum[0];
      })

    fCtrl.selectSection = function (section) {
      fCtrl.currentSection = section;
      fCtrl.showingCategories = false;
      fCtrl.showingSection = true;
    }

    fCtrl.selectTopic = function (topic) {
      fCtrl.currentTopic = topic;
      fCtrl.showingCategories = false;
      fCtrl.showingSection = false;
      fCtrl.showingTopic = true;
    }

    fCtrl.goBackToSection = function () {
      fCtrl.showingCategories = false;
      fCtrl.showingSection = true;
      fCtrl.showingTopic = false;
    }


    


  }
