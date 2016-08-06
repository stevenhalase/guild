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

    hCtrl.raids = [{
      id : '1',
      title : 'The Emerald Nightmare',
      difficulties : ['Normal', 'Heroic', 'Mythic'],
      bosses : [{
        name: 'Nythendra',
        alive: false
      },{
        name: 'Il’gynoth',
        alive: false
      },{
        name: 'Heart of corruption',
        alive: false
      },{
        name: 'Elerethe Renefal',
        alive: false
      },{
        name: 'Ursoc',
        alive: false
      },{
        name: 'Dragons of Nightmare',
        alive: true
      },{
        name: 'Cenarius',
        alive: true
      },{
        name: 'Xavius',
        alive: true
      }],
      img: '../images/emerald-nightmare.jpg'
    },{
      id : '2',
      title : 'The Nighthold',
      difficulties : ['Normal', 'Heroic', 'Mythic'],
      bosses : [{
        name: 'Skorpyron',
        alive: false
      },{
        name: 'Chronomatic Anomaly',
        alive: false
      },{
        name: 'Trilliax',
        alive: false
      },{
        name: 'Spellblade Aluriel',
        alive: true
      },{
        name: 'Tichondrius',
        alive: true
      },{
        name: 'Krosus',
        alive: true
      },{
        name: 'High Botanist Tel’arn',
        alive: true
      },{
        name: 'Star Augur Etraeus',
        alive: true
      },{
        name: 'Grand Magistrix Elisandre',
        alive: true
      },{
        name: 'Gul’dan',
        alive: true
      }],
      img: '../images/nighthold.jpg'
    }]
    for (let i = 0; i < hCtrl.raids.length; i++) {
      let bossesDefeated = 0;
      for (let j = 0; j < hCtrl.raids[i].bosses.length; j++) {
        if (hCtrl.raids[i].bosses[j].alive === false) {
          bossesDefeated = bossesDefeated + 1;
          console.log(bossesDefeated)
        }
      }
      console.log('Bosses alive: ', bossesDefeated)
      hCtrl.raids[i].progress = ((bossesDefeated / hCtrl.raids[i].bosses.length) * 100);
    }

    hCtrl.openRaidDetails = function(id) {
      let modalID = '#raidModal' + id;
      console.log('opening', modalID)
      $(modalID).modal('show')
    }
  }
