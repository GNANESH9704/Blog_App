
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/User');
const Post = require('../src/models/Post');
require('dotenv').config();

async function seed(){
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogapp');
  await User.deleteMany({});
  await Post.deleteMany({});
  const pass = await bcrypt.hash('password123', 10);
  const u1 = await User.create({ username: 'alice', email: 'alice@example.com', passwordHash: pass });
  const u2 = await User.create({ username: 'bob', email: 'bob@example.com', passwordHash: pass });
  const posts = [];
  for(let i=1;i<=8;i++){
    posts.push({
      title: `Sample Post ${i}`,
      imageURL: 'https://picsum.photos/800/400?random=' + i,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(8),
      username: i%2?u1.username:u2.username,
      author: i%2?u1._id:u2._id
    });
  }
  await Post.insertMany(posts);
  console.log('Seeded!');
  process.exit(0);
}

seed().catch(e=>{ console.error(e); process.exit(1); });
