import mongoose from "mongoose";

const articleSchema = mongoose.Schema({

  img: { type: String },
  caption: { type: String, require: true},
  url: { type: String, require: true},
});

const Article = mongoose.model('Article', articleSchema);

export { Article };