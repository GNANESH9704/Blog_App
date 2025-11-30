
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth.context';

export default function Login(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ emailOrUsername:'', password:'' });
  const [err, setErr] = useState(null);
  async function submit(e){
    e.preventDefault();
    try{
      await login(form);
      nav('/');
    }catch(e){
      setErr(e.response?.data?.message || 'Login failed');
    }
  }
  return (
    <div className="card fade-in">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div className="form-row"><label>Email or Username</label><input className="input" value={form.emailOrUsername} onChange={e=>setForm({...form,emailOrUsername:e.target.value})} required /></div>
        <div className="form-row"><label>Password</label><input className="input" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /></div>
        {err && <div className="small" style={{color:'red'}}>{err}</div>}
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}
