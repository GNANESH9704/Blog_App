
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../state/auth.context';

export default function PostDetail(){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(()=>{ api.get('/posts/'+id).then(r=>setPost(r.data.post)).catch(()=>{}); }, [id]);

  if(!post) return <div className="card">Loading...</div>;
  const isOwner = user && user.id === post.author;
  async function handleDelete(){
    if(!confirm('Delete post?')) return;
    await api.delete('/posts/'+id);
    nav('/');
  }

  return (
    <div className="card fade-in">
      <img src={post.imageURL || 'https://picsum.photos/seed/'+post._id+'/1200/600'} className="post-thumb" alt="" />
      <h2>{post.title}</h2>
      <p className="small">By {post.username} • {new Date(post.createdAt).toLocaleString()}</p>
      <div style={{whiteSpace:'pre-wrap', marginTop:12}}>{post.content}</div>
      {isOwner && (
        <div style={{marginTop:12}}>
          <Link to={`/posts/${id}/edit`} className="btn" style={{marginRight:8}}>Edit</Link>
          <button className="btn" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
