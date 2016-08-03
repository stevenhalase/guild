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



    // fCtrl.thread = {
    //   title: 'Welcome, Please Read',
    //   author: {
    //     name: 'Some Author'
    //   },
    //   date: '08/02/2016',
    //   replies: 0,
    //   type: 'Normal',
    //   pinned: true,
    //   message: 'At mel soleat dictas. Ius an virtute noluisse appetere. No mel soluta necessitatibus. Usu commodo fabellas cu, et vix erroribus disputationi. Nam ubique fierent eu, at possit eligendi verterem eam, adhuc mundi ius an. Malis voluptatibus ad eam, nibh errem dicunt pri no, ne dictas consequuntur sit. His ad labitur delenit contentiones. Mea cu quaeque eruditi, vel appetere mandamus ea, eu sale novum ius. No adhuc luptatum referrentur pri, ad utroque gloriatur vim. Et cum tamquam civibus, qui eu populo similique. Qui inermis abhorreant ei. Nec utinam facilisi scribentur ut.'
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
    //
    // console.log('Forum to save: ', fCtrl.forum)
    // forumFactory.saveForum(fCtrl.forum)
    //   .then(function(response) {
    //     console.log(response);
    //   })


  }
