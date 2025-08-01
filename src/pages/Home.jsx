import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ ingredient: '', cuisine: '', type: '' });

  const fetchRecipes = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await axios.get(`http://localhost:5000/api/recipes?${query}`);
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchRecipes();
  };

  return (
    <div>
      <h2>Find Recipes</h2>
      <input type="text" name="ingredient" placeholder="Ingredient" onChange={handleChange} />
      <input type="text" name="cuisine" placeholder="Cuisine" onChange={handleChange} />
      <input type="text" name="type" placeholder="Type" onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h3>{recipe.name}</h3>
            <p>Cuisine: {recipe.cuisine}</p>
            <p>Cook Time: {recipe.cookTime} mins</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
