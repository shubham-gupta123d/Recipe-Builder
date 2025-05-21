import { useEffect } from 'react'

const RecipeModal = ({ recipe, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'unset')
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-600">
        <div className="p-6 relative">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Recipe content */}
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{recipe.title}</h1>
          <div className="border-b border-gray-200 dark:border-gray-600 mb-4"></div>
          
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">Ingredients:</h2>
          <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="mb-1">{ingredient}</li>
            ))}
          </ul>

          <div className="flex items-center mb-4 text-gray-700 dark:text-gray-300">
            <span className="font-medium">Time: </span>
            <span className="ml-2">{recipe.time}</span>
          </div>

          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-white">Instructions</h3>
          <p className="whitespace-pre-line text-gray-600 dark:text-gray-300">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeModal