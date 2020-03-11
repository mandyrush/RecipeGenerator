const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  mealType: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  ingredients: [
    {
      ingredientId: {
        type: Schema.Types.ObjectId
      },
      quantity: {
        type: Number,
        required: true
      },
      ingredient: {
        type: String,
        required: true
      }
    }
  ],
  directions: [
    {
      direction: {
        type: String,
        required: true
      }
    }
  ]
});

recipeSchema.methods.addIngredient = function(ingredient) {
  let updatedIngredients = [...this.ingredients];
  updatedIngredients.push(ingredient);
  this.ingredients = updatedIngredients;
  return this.save();
};

module.exports = mongoose.model('Recipe', recipeSchema);