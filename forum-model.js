'use strict'
const mongoose = require('mongoose');

const forumSchema = mongoose.Schema({
    threadCategories: [{
      title: { type: String },
      threadSections: [{
        image: { type: String },
        title: { type: String },
        description: { type: String },
        threads: [{
          title: { type: String },
          author: { type: Object },
          date: { type: String },
          replies: { type: Number },
          type: { type: String },
          pinned: { type: Boolean }
        }]
      }]
    }]
});

const Forum = mongoose.model('forum', forumSchema);

module.exports = Forum;
