if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
}

// Function to search recipes based on user input
async function searchRecipes() {
    const searchBar = document.getElementById("searchBar").value.trim().toLowerCase();
    const recipeList = document.getElementById("recipeList");

    if (!searchBar) {
        recipeList.innerHTML = "<p>Please enter some ingredients.</p>";
        return;
    }

    try {
        // Replace with your external API endpoint
        const response = await 
    fetch ('https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchBar}&number=10&apiKey=a484d9f4fe454cccafff2581e82465ff');
        
        if (!response.ok) {
            throw new Error("Failed to fetch recipes. Please check your API or try again later.");
        }

        const recipes = await response.json();
        displayFilteredRecipes(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeList.innerHTML = "<p>Could not fetch recipes. Please try again later.</p>";
    }
}

// Function to display the fetched recipes
function displayFilteredRecipes(recipes) {
    const recipeList = document.getElementById("recipeList");
    recipeList.innerHTML = ""; // Clear previous results

    if (recipes.length === 0) {
        recipeList.innerHTML = "<p>No recipes found. Please try different ingredients.</p>";
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p><strong>Used Ingredients:</strong> ${recipe.usedIngredients.map(ing => ing.name).join(", ")}</p>
            <p><strong>Missing Ingredients:</strong> ${recipe.missedIngredients.map(ing => ing.name).join(", ")}</p>
        `;
        

        recipeList.appendChild(recipeCard);
    });
}