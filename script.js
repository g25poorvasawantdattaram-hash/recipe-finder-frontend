async function searchRecipes() {
  const ingredient = document.getElementById('search').value;
  const response = await fetch(`http://localhost:5000/api/recipes?ingredient=${ingredient}`);
  const data = await response.json();

  const list = document.getElementById('recipe-list');
  list.innerHTML = '';
  data.forEach(recipe => {
    const li = document.createElement('li');
    li.textContent = recipe.name;
    list.appendChild(li);
  });
}
