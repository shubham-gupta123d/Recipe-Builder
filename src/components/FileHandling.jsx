const FileHandling = ({ ingredients, instructions, servings, setIngredients, setInstructions, setServings }) => {
  const handleSave = () => {
    const recipe = { ingredients, instructions, servings }
    const blob = new Blob([JSON.stringify(recipe, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'recipe.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleLoad = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const recipe = JSON.parse(event.target.result)
        setIngredients(recipe.ingredients || [])
        setInstructions(recipe.instructions || '')
        setServings(recipe.servings || 1)
      } catch (error) {
        alert('Error loading recipe file')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Save Recipe
      </button>
      
      <label className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer">
        Load Recipe
        <input 
          type="file" 
          accept=".json" 
          onChange={handleLoad} 
          className="hidden" 
        />
      </label>
    </div>
  )
}

export default FileHandling