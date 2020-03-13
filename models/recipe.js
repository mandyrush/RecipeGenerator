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
        type: String,
        required: true
      },
      measurementUnit: {
        type: String
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
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User,',
    required: true
  }
});

recipeSchema.methods.addIngredient = function(ingredient) {
  let updatedIngredients = [...this.ingredients];
  updatedIngredients.push(ingredient);
  this.ingredients = updatedIngredients;
  return this.save();
};

recipeSchema.methods.deleteIngredient = function(ingredientId) {
  let updatedIngredients = [...this.ingredients];
  updatedIngredients = updatedIngredients.filter(ing => ing._id.toString() !== ingredientId.toString());
  this.ingredients = updatedIngredients;
  return this.save();
};

recipeSchema.methods.addDirection = function(direction) {
  let updatedDirections = [...this.directions];
  updatedDirections.push(direction);
  this.directions = updatedDirections;
  return this.save();
};

recipeSchema.methods.deleteDirection = function(directionId) {
  let updatedDirections = [...this.directions];
  updatedDirections = updatedDirections.filter(dir => dir._id.toString() !== directionId.toString());
  this.directions = updatedDirections;
  return this.save();
};

module.exports = mongoose.model('Recipe', recipeSchema);