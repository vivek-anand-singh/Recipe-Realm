import React, { useEffect } from "react";
import { fetchAllRecipes, fetchRecipes, fetchRecipeDetails } from "../services/FetchRecipe";
import { useState } from "react";
import RecipeTile from "../tiles/RecipeTile";
import RecipeDetails from "../pages/RecipeDetails";

export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [recipeDetails, setRecipeDetails] = useState([]);
    const [showRecipe, setShowRecipe] = useState(false);

    useEffect(()=> handleAllRecipes, []);

    const handleClick = (id) => {
        console.log(id);
        setShowRecipe((prev) => {return !prev});
        handleRecipeDetails(id);
    }

    const handleRecipeDetails = async (id) => {
        try {
            const instructions = await fetchRecipeDetails(id);
            setRecipeDetails(instructions);
            console.log(instructions);
        }
        catch (error) {
            console.error("Error fetching recipe details:", error);
        }
    }

    const handleAllRecipes = async () => {
        try {
            const allRecipes = await fetchAllRecipes();
            setRecipes(allRecipes);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const handleRecipe = async (recipe) => { 
        try {
            const recipes = await fetchRecipes(recipe);
            setRecipes(recipes);
        }
        catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <div className="flex justify-center mt-5">
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    className="w-1/2 p-2 rounded border border-gray-300 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => handleRecipe(searchTerm)}
                >
                    Get Recipe
                </button>
            </div>
            {   
                showRecipe ? <RecipeDetails recipeData={recipeDetails}/> :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {recipes.map((recipe) => (
                        <RecipeTile handleClick={handleClick} id={recipe.id} image={recipe.image} title={recipe.title} />
                    ))}
                </div>
            }
        </>
    );
}