
const Post = require('../models/Post');
const { createSchema, updateSchema } = require('../validators/post.validator');

// Create post
async function createPost(req,res,next){
  try{
    const { error, value } = createSchema.validate(req.body);
    if(error) return res.status(400).json({ message: 'Validation error', details: error.details });
    const post = await Post.create({ ...value, username: req.user.username, author: req.user.id });
    res.status(201).json({ post });
  }catch(e){ next(e); }
}

// List posts with pagination and search
async function listPosts(req,res,next){
  try{
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const search = req.query.search ? req.query.search.trim() : null;
    const filter = {};
    if(search){
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter).sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit).lean();
    res.json({ data: posts, page, totalPages: Math.ceil(total/limit), total });
  }catch(e){ next(e); }
}

// Get one post
async function getPost(req,res,next){
  try{
    const post = await Post.findById(req.params.id).lean();
    if(!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  }catch(e){ next(e); }
}

// Update post
async function updatePost(req,res,next){
  try{
    const { error, value } = updateSchema.validate(req.body);
    if(error) return res.status(400).json({ message: 'Validation error', details: error.details });
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message: 'Post not found' });
    if(post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(post, value);
    await post.save();
    res.json({ post });
  }catch(e){ next(e); }
}

// Delete post
async function deletePost(req,res,next){
  try{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message: 'Post not found' });
    if(post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await post.remove();
    res.json({ message: 'Deleted' });
  }catch(e){ next(e); }
}

module.exports = { createPost, listPosts, getPost, updatePost, deletePost };
