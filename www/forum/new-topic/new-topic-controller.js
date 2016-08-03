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
      ntCtrl.newTopic.author = ntCtrl.user;
      ntCtrl.newTopic.date = new Date();
      ntCtrl.newTopic.replies = 0;
      console.log('New Topic: ', ntCtrl.newTopic)
      console.log('Forum: ', ntCtrl.forum)
      console.log('Section: ', ntCtrl.currentSectionID);

      for (let i = 0; i < ntCtrl.forum.threadCategories.length; i++) {
        for (let j = 0; j < ntCtrl.forum.threadCategories[i].threadSections.length; j++) {
          console.log(ntCtrl.forum.threadCategories[i].threadSections[j].title);
          if (ntCtrl.forum.threadCategories[i].threadSections[j]._id == ntCtrl.currentSectionID) {
            ntCtrl.forum.threadCategories[i].threadSections[j].threads.push(ntCtrl.newTopic);
            console.log('here')
            console.log('new forum: ', ntCtrl.forum)
            forumFactory.saveForum(ntCtrl.forum)
              .then(function(response) {
                console.log('Saving response: ', response)
                ntCtrl.forum = response.data.forum[0];
              })
          }
        }
      }

    }

    // ntCtrl.submitNewTopic = function () {
    //   ntCtrl.newTopic.author = ntCtrl.user;
    //   ntCtrl.newTopic.date = new Date();
    //   ntCtrl.newTopic.replies = 0;
    //   console.log('New Topic: ', ntCtrl.newTopic)
    //   console.log('Forum: ', ntCtrl.forum)
    //   console.log('Section: ', ntCtrl.currentSectionID);
    //
    //   forumFactory.saveSection(ntCtrl.currentSectionID, ntCtrl.newTopic)
    //     .then(function(response) {
    //       console.log('Section save response: ', response)
    //     })
    //
    // }

    // let width = $("#new-topic-title").parent().parent().width() - 35;
    // $("#new-topic-title").width(width);
    // $("#new-topic-message").width(width);
    // $(window).resize(function(){
    //   let width = $("#new-topic-title").parent().parent().width() - 35;
    //   console.log(width)
    //     $("#new-topic-title").width(width);
    //     $("#new-topic-message").width(width);
    // });


  }
