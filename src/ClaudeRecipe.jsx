import './ClaudeRecipe.css';
import ReactMarkdown from "react-markdown"

function recipe(props)
 { 
    return (
        <section className = "recipeSection">
            <h2>Chef Claude Recommends:</h2>
            <div dangerouslySetInnerHTML={{ __html: props.recipe }} />
        </section>
    )
}

export default recipe;