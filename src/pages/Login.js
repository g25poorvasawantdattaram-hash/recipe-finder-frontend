import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, set] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      setErr("");
      await login(form.email.trim(), form.password);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={submit} className="form">
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
        <button>Login</button>
      </form>
      <p className="muted">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}
