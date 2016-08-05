'use strict'
angular.module('guildApp')
  .controller('newTopicCtrl', newTopicController)

  newTopicController.$inject = ['$http', 'forumFactory', 'userFactory', '$stateParams'];

  function newTopicController ($http, forumFactory, userFactory, $stateParams) {
    const ntCtrl = this;
    ntCtrl.title = 'New Topic Controller';

    ntCtrl.forum = [];
    ntCtrl.currentSectionID = $stateParams.section;

    forumFactory.getForum()
      .then(function(response) {
        console.log(response.data.forum[0])
        ntCtrl.forum = response.data.forum[0];
      })

    userFactory.getUser()
      .then(function(response) {
        console.log(response);
        ntCtrl.user = response.data.user;
      });

    ntCtrl.submitNewTopic = function () {
      ntCtrl.newTopic.author = {
        _id: ntCtrl.user._id,
        name: ntCtrl.user.name,
        img: ntCtrl.user.img
      };
      ntCtrl.newTopic.date = new Date();
      ntCtrl.newTopic.replies = 0;
      console.log('New Topic: ', ntCtrl.newTopic)
      console.log('Forum: ', ntCtrl.forum)
      console.log('Section: ', ntCtrl.currentSectionID);

      forumFactory.saveSection(ntCtrl.currentSectionID, ntCtrl.newTopic)
        .then(function(response) {
          console.log('Thread save response: ', response)
        })

    }

    // ntCtrl.submitNewReply = function () {
    //
    // }


  }
