import { useState } from 'react';
import axios from 'axios';

export default function AddRecipe() {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    cuisine: '',
    type: '',
    cookTime: '',
    instructions: ''
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return alert('Not authorized');

    try {
      await axios.post('http://localhost:5000/api/recipes', {
        ...recipe,
        ingredients: recipe.ingredients.split(',').map((item) => item.trim())
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Recipe added!');
    } catch (err) {
      alert('Failed to add recipe');
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Recipe Name" onChange={handleChange} required /><br />
        <input name="ingredients" placeholder="Ingredients (comma separated)" onChange={handleChange} required /><br />
        <input name="cuisine" placeholder="Cuisine" onChange={handleChange} /><br />
        <input name="type" placeholder="Type" onChange={handleChange} /><br />
        <input name="cookTime" type="number" placeholder="Cook Time (minutes)" onChange={handleChange} /><br />
        <textarea name="instructions" placeholder="Instructions" onChange={handleChange} /><br />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

