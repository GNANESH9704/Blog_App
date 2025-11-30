
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../state/auth.context';

export default function CreateEdit(){
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ title:'', imageURL:'', content:'' });
  const [errors, setErrors] = useState(null);

  useEffect(()=>{
    if(id){ api.get('/posts/'+id).then(r=>setForm({ title:r.data.post.title, imageURL:r.data.post.imageURL, content:r.data.post.content })).catch(()=>{}); }
  }, [id]);

  async function submit(e){
    e.preventDefault();
    try{
      if(!user) return alert('Login required');
      if(id){
        const res = await api.put('/posts/'+id, form);
        nav('/posts/'+id);
      } else {
        const res = await api.post('/posts', form);
        nav('/posts/'+res.data.post._id);
      }
    }catch(err){
      setErrors(err.response?.data?.message || 'Submission failed');
    }
  }

  return (
    <div className="card fade-in">
      <h3>{id ? 'Edit' : 'Create'} post</h3>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Title</label>
          <input className="input" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required minLength={5} maxLength={120} />
        </div>
        <div className="form-row">
          <label>Image URL</label>
          <input className="input" value={form.imageURL} onChange={e=>setForm({...form, imageURL:e.target.value})} />
        </div>
        <div className="form-row">
          <label>Content</label>
          <textarea value={form.content} onChange={e=>setForm({...form, content:e.target.value})} required minLength={50} />
        </div>
        {errors && <div className="small" style={{color:'red'}}>{errors}</div>}
        <button className="btn" type="submit">{id ? 'Save' : 'Create'}</button>
      </form>
    </div>
  );
}
