import { useState } from 'react'
import placeholder from '../assets/recipe-placeholder.jpg'
import RecipeModal from './RecipeModal'

const RecipeCard = ({ title, image, time = "30 mins" }) => {
  const [imgSrc, setImgSrc] = useState(image || placeholder)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Sample recipe data structure
  const recipeData = {
    title: title,
    time: time,
    ingredients: getIngredientsByTitle(title),
    instructions: getInstructionsByTitle(title)
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
        <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img 
            src={imgSrc} 
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImgSrc(placeholder)}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">{time}</span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 font-medium transition-colors"
            >
              View Recipe
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RecipeModal 
          recipe={recipeData} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  )
}

// Helper functions (replace with your actual data)
function getIngredientsByTitle(title) {
  const recipes = {
    "Grilled Cheese Sandwich": [
      "2 slices bread",
      "2 slices cheddar cheese",
      "1 tbsp butter",
      "1 tsp garlic powder"
    ],
    "Caprese Salad": [
      "Fresh tomatoes",
      "Mozzarella cheese",
      "Fresh basil leaves",
      "Olive oil",
      "Balsamic glaze",
      "Salt & pepper"
    ],
    // Add other recipes...
  }
  return recipes[title] || ["Ingredients not available"]
}

function getInstructionsByTitle(title) {
  const instructions = {
    "Grilled Cheese Sandwich": "1. Butter the bread\n2. Add cheese between slices\n3. Cook in pan until golden brown",
    "Caprese Salad": "1. Slice tomatoes and mozzarella\n2. Layer alternately on plate\n3. Add basil leaves\n4. Drizzle with olive oil and balsamic\n5. Season with salt and pepper",
    // Add other recipes...
  }
  return instructions[title] || "Instructions not available"
}

export default RecipeCard