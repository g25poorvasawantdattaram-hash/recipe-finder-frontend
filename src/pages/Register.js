import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, set] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      setErr("");
      await register(form.username.trim(), form.email.trim(), form.password);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="card">
      <h2>Register</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={submit} className="form">
        <input
          placeholder="Username"
          value={form.username}
          onChange={e => set({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => set({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => set({ ...form, password: e.target.value })}
        />
        <button>Create Account</button>
      </form>
      <p className="muted">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

