const express = require('express');

const recipeController = require('../controllers/recipe');

const router = express.Router();

router.get('/', recipeController.getIndex);

router.get('/recipes', recipeController.getRecipes);

router.get('/recipe', recipeController.getRecipe);

router.get('/add-recipe', recipeController.addRecipe);

module.exports = router;