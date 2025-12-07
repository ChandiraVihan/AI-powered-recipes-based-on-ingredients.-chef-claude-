import './App.css'

function IngredientsList(props) {
    const ingredientListItems = props.ingredients.map((ingredient) => (
        <li key={ingredient}>{ingredient}</li>
    ));

    return (
            <section>
                <h2 className = "ingredientsTitle">Ingredients on hand : </h2>
                <ul className = "ingredientList" aria-live = "polite">{ingredientListItems}</ul>
            {props.ingredients.length > 3 && <div className = "recipeContainer">
                <div>
                    <h3>Ready for a Recipe? </h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.onGetRecipe} >Get a recipe</button>
                </div>}
            </section>
    )
}

export default IngredientsList;