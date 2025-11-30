
import React, { useEffect, useState } from 'react';
import { useAuth } from '../state/auth.context';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Profile(){
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    if(user) api.get('/posts', { params: { search: user.username, limit: 50 } }).then(r=>setPosts(r.data.data)).catch(()=>{});
  }, [user]);
  return (
    <div className="fade-in">
      <h3>My posts</h3>
      <div className="grid">
        {posts.map(p=>(
          <div className="card" key={p._id}>
            <img src={p.imageURL||'https://picsum.photos/seed/'+p._id+'/800/400'} className="post-thumb" alt="" />
            <h4>{p.title}</h4>
            <div style={{display:'flex', gap:8}}>
              <Link to={'/posts/'+p._id+'/edit'} className="btn">Edit</Link>
              <Link to={'/posts/'+p._id} className="small">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
