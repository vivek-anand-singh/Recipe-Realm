import React from "react";

const RecipeDetails = ({ recipeData }) => {
  return (
    <div className="bg-gray-100 font-sans min-h-screen p-6">
      {/* Recipe Container */}
      {recipeData.map((recipe, index) => (
        <div key={index} className="max-w-4xl mx-auto bg-white shadow-md rounded-lg mb-8">
          {/* Recipe Name */}
          <h1 className="text-3xl font-bold text-gray-800 p-6 border-b">
            {recipe.name || "Untitled Recipe"}
          </h1>

          {/* Steps Section */}
          <div className="p-6 space-y-4">
            {recipe.steps.map((step, stepIndex) => (
              <div key={stepIndex} className="bg-gray-50 p-4 rounded-lg shadow">
                {/* Step Number */}
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Step {step.number}
                </h2>

                {/* Step Description */}
                <p className="text-gray-600">{step.step}</p>

                {/* Ingredients */}
                {step.ingredients.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800">Ingredients:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {step.ingredients.map((ingredient, ingIndex) => (
                        <li key={ingIndex}>
                          {ingredient.localizedName || ingredient.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Equipment */}
                {step.equipment.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800">Equipment:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {step.equipment.map((equipment, equipIndex) => (
                        <li key={equipIndex}>
                          {equipment.localizedName || equipment.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Timing (if available) */}
                {step.length && (
                  <div className="mt-2 text-gray-500">
                    Duration: {step.length.number} {step.length.unit}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeDetails;
