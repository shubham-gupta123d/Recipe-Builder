import { useState } from 'react'

const IngredientForm = ({ ingredients, setIngredients, servings, darkMode }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('g')
  const [error, setError] = useState('')

  const units = ['g', 'kg', 'ml', 'l', 'cups', 'tbsp', 'tsp', 'pinch', 'piece']

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError('Ingredient name is required')
      return
    }
    
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      setError('Please enter a valid quantity')
      return
    }

    const baseQuantity = parseFloat(quantity) / servings
    
    setIngredients([...ingredients, {
      id: Date.now(),
      name: name.trim(),
      baseQuantity,
      unit
    }])
    
    setName('')
    setQuantity('')
    setUnit('g')
    setError('')
  }

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-4">Add Ingredient</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            placeholder="e.g. Flour"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              placeholder="e.g. 100"
            />
          </div>
          
          <div>
            <label className="block mb-1">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              {units.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Add Ingredient
        </button>
      </form>
    </div>
  )
}

export default IngredientForm