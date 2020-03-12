const express = require('express');

const recipeController = require('../controllers/recipe');

const router = express.Router();

router.get('/', recipeController.getIndex);

router.get('/recipes', recipeController.getRecipes);

router.get('/recipe/:recipeId', recipeController.getRecipe);

router.get('/add-recipe', recipeController.getAddRecipe);

router.post('/add-recipe', recipeController.postRecipe);

router.get('/add-ingredient/:recipeId', recipeController.getAddIngredient);

router.post('/add-ingredient/:recipeId', recipeController.postAddIngredient);

router.post('/add-direction/:recipeId', recipeController.postAddDirection);

router.post('/delete-recipe', recipeController.postDeleteRecipe);

module.exports = router;