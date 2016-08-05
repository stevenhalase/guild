'use strict'
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  title: { type: String },
  author: { type: Object },
  date: { type: String },
  message: { type: String }
})

const threadSchema = mongoose.Schema({
  title: { type: String },
  author: { type: Object },
  date: { type: String },
  comments: [commentSchema],
  type: { type: String },
  pinned: { type: Boolean },
  message: { type: String }
})
const threadSectionsSchema = mongoose.Schema({
  image: { type: String },
  title: { type: String },
  description: { type: String },
  threads: [threadSchema]
})
const forumSchema = mongoose.Schema({
    threadCategories: [{
      title: { type: String },
      threadSections: [threadSectionsSchema]
    }]
},{ strict: false });

const Forum = mongoose.model('forum', forumSchema);

module.exports = Forum;
