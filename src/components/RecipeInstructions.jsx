import { useState } from 'react'

const RecipeInstructions = ({ instructions, setInstructions, darkMode }) => {
  const [isPreview, setIsPreview] = useState(false)

  const formatMarkdown = (text) => {
    // Simple markdown formatting
    return text
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-2">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-2">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />')
  }

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      
      {isPreview ? (
        <div 
          className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}
          dangerouslySetInnerHTML={{ __html: formatMarkdown(instructions) }}
        />
      ) : (
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className={`w-full h-64 p-3 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          placeholder="Enter recipe instructions (supports Markdown like **bold**, *italic*, # Heading)"
        />
      )}
    </div>
  )
}

export default RecipeInstructions