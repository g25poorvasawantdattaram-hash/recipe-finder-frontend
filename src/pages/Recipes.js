import React, { useEffect, useState } from "react";
import api from '../api';
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

export default function Recipes() {
  const { user, logout } = useAuth();
  const [all, setAll] = useState([]);
  const [mine, setMine] = useState([]);
  const [msg, setMsg] = useState("");

  const [form, set] = useState({
    title: "",
    cuisine: "",
    type: "Vegetarian",
    cookTime: 0,
    instructions: "",
    ingredients: "" // comma-separated names
  });

  async function load() {
    const a = await api.get("/api/recipes");
    setAll(a.data);
    try {
      const m = await api.get("/api/recipes/mine");
      setMine(m.data);
    } catch {
      setMine([]); // unauthenticated or no token is fine
    }
  }

  useEffect(() => { load(); }, []);

  async function create(e) {
    e.preventDefault();
    setMsg("");
    try {
      const ingredients = form.ingredients
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
        .map(name => ({ name }));

      await api.post("/api/recipes", {
        title: form.title.trim(),
        cuisine: form.cuisine.trim(),
        type: form.type,
        cookTime: Number(form.cookTime) || 0,
        instructions: form.instructions.trim(),
        ingredients
      });

      setMsg("✅ Recipe created");
      set({ title: "", cuisine: "", type: "Vegetarian", cookTime: 0, instructions: "", ingredients: "" });
      await load();
    } catch (e) {
      setMsg(e?.response?.data?.message || "Create failed");
    }
  }

  return (
    <div className="container">
      <header className="bar">
        <div className="brand">Recipe Finder</div>
        <div>
          {user ? (
            <>
              <span className="muted">Hi, {user.username || user.email}</span>
              <button className="link" onClick={() => { logout(); window.location.href = "/login"; }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="link" to="/login">Login</Link>
              <span className="muted"> · </span>
              <Link className="link" to="/register">Register</Link>
            </>
          )}
        </div>
      </header>

      {localStorage.getItem("token") && (
        <div className="card">
          <h3>Create Recipe</h3>
          {msg && <div className="info">{msg}</div>}
          <form onSubmit={create} className="grid">
            <input placeholder="Title" value={form.title} onChange={e => set({ ...form, title: e.target.value })} />
            <input placeholder="Cuisine (e.g., Indian)" value={form.cuisine} onChange={e => set({ ...form, cuisine: e.target.value })} />
            <select value={form.type} onChange={e => set({ ...form, type: e.target.value })}>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Non-Vegetarian</option>
            </select>
            <input type="number" placeholder="Cook Time (minutes)" value={form.cookTime} onChange={e => set({ ...form, cookTime: e.target.value })} />
            <textarea placeholder="Instructions" rows={3} value={form.instructions} onChange={e => set({ ...form, instructions: e.target.value })} />
            <input placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={e => set({ ...form, ingredients: e.target.value })} />
            <button>Add Recipe</button>
          </form>
        </div>
      )}

      <div className="columns">
        <section className="card">
          <h3>My Recipes</h3>
          {!localStorage.getItem("token") && <div className="muted">Login to see your recipes.</div>}
          <ul className="list">
            {mine.map(r => (
              <li key={r._id}>
                <strong>{r.title}</strong> — {r.type} — {r.cookTime}m
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h3>All Recipes</h3>
          <ul className="list">
            {all.map(r => (
              <li key={r._id}>
                <strong>{r.title}</strong> — {r.type} — {r.cookTime}m
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
