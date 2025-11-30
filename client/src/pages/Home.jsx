
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Home(){
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  async function load(){
    setLoading(true);
    const res = await api.get('/posts', { params: { page, limit: 8, search: q } });
    setPosts(res.data.data);
    setLoading(false);
  }
  useEffect(()=>{ load(); }, [page]);

  return (
    <div className="fade-in">
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <input placeholder="Search title or author" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn" onClick={()=>{ setPage(1); load(); }}>Search</button>
      </div>
      <div className="grid">
        {loading ? <div>Loading...</div> : posts.map(p=> (
          <div key={p._id} className="card">
            <img src={p.imageURL || 'https://picsum.photos/seed/'+p._id+'/800/400'} className="post-thumb" alt="" />
            <h3>{p.title}</h3>
            <p className="small">By {p.username} • {new Date(p.createdAt).toLocaleString()}</p>
            <p className="small">{p.content.slice(0,140)}...</p>
            <Link to={'/posts/'+p._id} className="small">Read</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
