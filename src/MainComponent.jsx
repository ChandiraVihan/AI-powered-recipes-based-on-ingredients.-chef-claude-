import { useState } from 'react';
import './App.css';
import Shuffle from './Shuffle.jsx';
import ClaudeRecipe from './ClaudeRecipe.jsx';
import IngredientsList from './IngredientsList.jsx';
import {getRecipeFromMistral} from './ai.js';

function MainComponent() {

    const [ingredients, setIngredients] =useState([])

    const [recipe, setRecipe] = useState(false);

    async function getRecipe() {
        const generatedRecipe = await getRecipeFromMistral(ingredients)
        setRecipe(generatedRecipe);

    }
 
    function addIngredient(FormData) {
        const newIngredient = FormData.get("ingredient")
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
    }


    return (
        <main>
            <form action={addIngredient} className = "ingredientForm">
                <input 
                    type = "text"
                    placeholder = "Enter ingredient"
                    aria-label = "Add ingredient"
                    name = "ingredient"
                    />
                <button>SUBMIT</button>
            </form>
            {ingredients.length > 0 ? <IngredientsList ingredients = {ingredients} onGetRecipe={getRecipe} /> : 
            <Shuffle 
                text="Add your First Ingredient." 
                className="noIngredientsText" 
                tag="p"                        // Renders as a <p> tag for semantic HTML
                stagger={0.03}
                duration={0.4}
                ease="power2.out"
                />
            } 
            { recipe && <ClaudeRecipe recipe = {recipe}/>
}
        </main>
    );
} 

export default MainComponent;