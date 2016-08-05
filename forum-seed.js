'use strict'
const Forum = require('./forum-model');
const mongoose = require('mongoose');

const uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/guild';

mongoose.connect(uristring, function(error) {
  ///// If error connecting to MongoDB
  if (error) {
      console.error(error);
  ///// If successfully connected to MongoDB
  } else {
      console.log('Mongoose connected successfully')
  }
})
let day = new Date().getDate();
let month = new Date().getMonth();
let year = new Date().getFullYear();
let date = '' + day + '/' + (month + 1) + '/' + year;
let comment = {
  title: 'My reply to your comment',
  author: {
    name: 'Killary Drumpf',
    img: 'http://www.fullredneck.com/wp-content/uploads/2016/05/Hillary-Clinton-Meme-12.png',
  },
  date: date,
  message: 'I really do not like this thread very much. I only like great threads. Only the best threads.'
};
let thread = {
  title: 'Welcome, Please Read',
  author: {
    name: 'Killary Drumpf',
    img: 'http://www.fullredneck.com/wp-content/uploads/2016/05/Hillary-Clinton-Meme-12.png',
  },
  comments: [comment],
  date: date,
  type: 'Normal',
  pinned: true,
  message: 'At mel soleat dictas. Ius an virtute noluisse appetere. No mel soluta necessitatibus. Usu commodo fabellas cu, et vix erroribus disputationi. Nam ubique fierent eu, at possit eligendi verterem eam, adhuc mundi ius an. Malis voluptatibus ad eam, nibh errem dicunt pri no, ne dictas consequuntur sit. His ad labitur delenit contentiones. Mea cu quaeque eruditi, vel appetere mandamus ea, eu sale novum ius. No adhuc luptatum referrentur pri, ad utroque gloriatur vim. Et cum tamquam civibus, qui eu populo similique. Qui inermis abhorreant ei. Nec utinam facilisi scribentur ut.'
};
let section = {
  image : 'http://orig08.deviantart.net/65e3/f/2014/207/e/2/official_wow_icon_by_benashvili-d7sd1ab.png',
  title: 'Guild Beta Discussion',
  description: 'Discuss Guild Beta with other beta testers.',
  threads : [thread]
}
let category = {
  title: 'Category Testing',
  threadSections: [section]
}
let forum = {
  threadCategories : [category]
}
// forumCategories[0].threadSections.push(section);
// console.log('Sample : ', forum.threadCategories[0].threadSections[0]);

// console.log('Forum to save: ', forum)
let newForum = new Forum(forum);
newForum.save(function(saveErr, retforum){
    if ( saveErr ) {
      console.log('Error saving Forum: ', saveErr)
     }
    else {
      console.log('saving forum: ', retforum)
    }
})
