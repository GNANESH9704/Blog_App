
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth.context';

export default function Register(){
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ username:'', email:'', password:'' });
  const [err, setErr] = useState(null);
  async function submit(e){
    e.preventDefault();
    try{
      await register(form);
      alert('Registered! Please login.');
      nav('/login');
    }catch(e){
      setErr(e.response?.data?.message || 'Register failed');
    }
  }
  return (
    <div className="card fade-in">
      <h3>Register</h3>
      <form onSubmit={submit}>
        <div className="form-row"><label>Username</label><input className="input" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required /></div>
        <div className="form-row"><label>Email</label><input className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></div>
        <div className="form-row"><label>Password</label><input type="password" className="input" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required minLength={6} /></div>
        {err && <div className="small" style={{color:'red'}}>{err}</div>}
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}
