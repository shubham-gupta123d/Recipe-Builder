import { Link } from 'react-router-dom'
import heroBg from '../assets/hero-bg.jpg'
import RecipeCard from '../components/RecipeCard'
import grilledCheese from '../assets/grilled-cheese.jpg'
import capreseSalad from '../assets/caprese.jpg'
import frenchOmelette from '../assets/omelette.jpg'
import bananaSmoothie from '../assets/smoothie.jpg'
import recipePlaceholder from '../assets/recipe-placeholder.jpg'

const Home = () => {
  const sampleRecipes = [
    { 
      id: 1, 
      title: "Grilled Cheese Sandwich", 
      image: grilledCheese,
      time: "15 mins",
      difficulty: "Easy"
    },
    { 
      id: 2, 
      title: "Caprese Salad", 
      image: capreseSalad,
      time: "10 mins",
      difficulty: "Easy"
    },
    { 
      id: 3, 
      title: "French Omelette", 
      image: frenchOmelette,
      time: "20 mins",
      difficulty: "Medium"
    },
    { 
      id: 4, 
      title: "Banana Smoothie", 
      image: bananaSmoothie,
      time: "5 mins",
      difficulty: "Easy"
    }
  ]

  return (
    <div className="relative dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={heroBg} 
          alt="Cooking ingredients" 
          className="w-full h-full object-cover dark:brightness-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Recipe Builder </h1>
            <p className="text-xl mb-8">Cook, Share, Inspire</p>
            <Link 
              to="/builder" 
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors"
            >
              Create Recipe
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Your Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              time={recipe.time}
              difficulty={recipe.difficulty}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home