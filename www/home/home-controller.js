'use strict'
angular.module('guildApp')
  .controller('homeCtrl', homeController);

  homeController.$inject = [];

  function homeController () {
    const hCtrl = this;
    hCtrl.title = 'Home Controller';

    hCtrl.newsItems = [{
      title : 'First News Item',
      img : './images/news/news-item1.jpg',
      story : 'Sit ei ferri vivendo insolens, ei docendi principes has. Sea dicat nonumy iudicabit te, at quo albucius abhorreant. Cu mel magna platonem. Eum natum phaedrum menandri ad, vidit nostro adipisci ne pri. Enim nostrud in eos, pro apeirian intellegam an.'
    },{
      title : 'Second News Item',
      img : './images/news/news-item2.jpg',
      story : 'Sit ei ferri vivendo insolens, ei docendi principes has. Sea dicat nonumy iudicabit te, at quo albucius abhorreant. Cu mel magna platonem. Eum natum phaedrum menandri ad, vidit nostro adipisci ne pri. Enim nostrud in eos, pro apeirian intellegam an.'
    },{
      title : 'Third News Item',
      img : './images/news/news-item3.jpg',
      story : 'Sit ei ferri vivendo insolens, ei docendi principes has. Sea dicat nonumy iudicabit te, at quo albucius abhorreant. Cu mel magna platonem. Eum natum phaedrum menandri ad, vidit nostro adipisci ne pri. Enim nostrud in eos, pro apeirian intellegam an.'
    }]
  }
