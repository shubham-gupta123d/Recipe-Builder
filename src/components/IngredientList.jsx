const IngredientList = ({ ingredients, setIngredients, servings, darkMode }) => {
  const handleRemove = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id))
  }

  const handleEdit = (id, field, value) => {
    setIngredients(ingredients.map(ing => {
      if (ing.id === id) {
        if (field === 'quantity') {
          return { ...ing, baseQuantity: parseFloat(value) / servings }
        }
        return { ...ing, [field]: value }
      }
      return ing
    }))
  }

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
      {ingredients.length === 0 ? (
        <p className="text-gray-500">No ingredients added yet</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {ingredients.map(ingredient => (
            <li key={ingredient.id} className="py-3 flex justify-between items-center group">
              <div className="flex-1">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleEdit(ingredient.id, 'name', e.target.value)}
                    className={`bg-transparent border-b mr-2 focus:outline-none focus:border-blue-500 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={(ingredient.baseQuantity * servings).toFixed(1)}
                    onChange={(e) => handleEdit(ingredient.id, 'quantity', e.target.value)}
                    className={`w-16 bg-transparent border-b mr-2 focus:outline-none focus:border-blue-500 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                  />
                  <select
                    value={ingredient.unit}
                    onChange={(e) => handleEdit(ingredient.id, 'unit', e.target.value)}
                    className={`bg-transparent border-b focus:outline-none focus:border-blue-500 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                  >
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="cups">cups</option>
                    <option value="tbsp">tbsp</option>
                    <option value="tsp">tsp</option>
                    <option value="pinch">pinch</option>
                    <option value="piece">piece</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => handleRemove(ingredient.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default IngredientList