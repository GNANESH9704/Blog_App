
const mongoose = require('mongoose');
const slugify = require('slugify');
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 120 },
  imageURL: { type: String },
  content: { type: String, required: true, minlength: 50 },
  username: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String, index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});
PostSchema.pre('save', function(next){
  if(!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true }).slice(0,120);
  this.updatedAt = new Date();
  next();
});
module.exports = mongoose.model('Post', PostSchema);
