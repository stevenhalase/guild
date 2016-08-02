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

  }


  // fCtrl.thread = {
  //   title: 'Welcome, Please Read',
  //   author: {
  //     name: 'Some Author'
  //   },
  //   date: '08/02/2016',
  //   replies: 0,
  //   type: 'Normal',
  //   pinned: true
  // };
  // fCtrl.section = {
  //   image : 'http://orig08.deviantart.net/65e3/f/2014/207/e/2/official_wow_icon_by_benashvili-d7sd1ab.png',
  //   title: 'Guild Beta Discussion',
  //   description: 'Discuss Guild Beta with other beta testers.',
  //   threads : [fCtrl.thread]
  // }
  // fCtrl.category = {
  //   title: 'Category Testing',
  //   threadSections: [fCtrl.section]
  // }
  // fCtrl.forum = {
  //   threadCategories : [fCtrl.category]
  // }
  // // fCtrl.forumCategories[0].threadSections.push(fCtrl.section);
  // console.log('Sample : ', fCtrl.forum.threadCategories[0].threadSections[0]);

  // console.log(fCtrl.forum)
  // forumFactory.saveForum(fCtrl.forum)
  //   .then(function(response) {
  //     console.log(response);
  //   })
