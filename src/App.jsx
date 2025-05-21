import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import IngredientForm from './components/IngredientForm'
import IngredientList from './components/IngredientList'
import RecipeInstructions from './components/RecipeInstructions'
import FileHandling from './components/FileHandling'
import ThemeToggle from './components/ThemeToggle'
import RecipeCard from './components/RecipeCard'
import RecipeModal from './components/RecipeModal'
import heroBg from './assets/hero-bg.jpg'
import recipeIcon from './assets/recipe-icon.png'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`p-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={recipeIcon} alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-bold">Recipe Builder</span>
          </div>
          <div className="flex space-x-4">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<RecipeBuilder darkMode={darkMode} />} />
        </Routes>
      </main>
    </div>
  )
}

// Recipe Builder Component
function RecipeBuilder({ darkMode }) {
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState('')
  const [servings, setServings] = useState(1)
  const navigate = useNavigate()

  // Load from localStorage on initial render
  useEffect(() => {
    const savedRecipe = localStorage.getItem('recipe')
    if (savedRecipe) {
      try {
        const { ingredients, instructions, servings } = JSON.parse(savedRecipe)
        setIngredients(ingredients || [])
        setInstructions(instructions || '')
        setServings(servings || 1)
      } catch (error) {
        console.error('Error parsing saved recipe:', error)
      }
    }
  }, [])

  // Save to localStorage whenever recipe changes
  useEffect(() => {
    const recipe = { ingredients, instructions, servings }
    localStorage.setItem('recipe', JSON.stringify(recipe))
  }, [ingredients, instructions, servings])

  const handleServingsChange = (newServings) => {
    if (newServings < 1) return
    setServings(newServings)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className={`mb-6 flex items-center text-sm font-medium ${darkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'} transition-colors`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Recipe Details</h2>
            <div className="flex items-center mb-4">
              <label className="mr-2">Servings:</label>
              <button 
                onClick={() => handleServingsChange(servings - 1)}
                className="px-3 py-1 rounded-l bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                -
              </button>
              <span className="px-4 py-1 bg-gray-200 dark:bg-gray-700">{servings}</span>
              <button 
                onClick={() => handleServingsChange(servings + 1)}
                className="px-3 py-1 rounded-r bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                +
              </button>
            </div>
            <FileHandling 
              ingredients={ingredients} 
              instructions={instructions} 
              servings={servings}
              setIngredients={setIngredients}
              setInstructions={setInstructions}
              setServings={setServings}
            />
          </div>

          <IngredientForm 
            ingredients={ingredients} 
            setIngredients={setIngredients} 
            servings={servings}
            darkMode={darkMode}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <IngredientList 
            ingredients={ingredients} 
            setIngredients={setIngredients} 
            servings={servings}
            darkMode={darkMode}
          />
          <RecipeInstructions 
            instructions={instructions} 
            setInstructions={setInstructions} 
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  )
}

export default App