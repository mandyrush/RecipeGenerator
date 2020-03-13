const express = require('express');

const recipeController = require('../controllers/recipe');

const router = express.Router();

router.get('/', recipeController.getIndex);

router.get('/recipes', recipeController.getRecipes);

router.get('/recipe/:recipeId', recipeController.getRecipe);

router.get('/add-recipe', recipeController.getAddRecipe);

router.post('/add-recipe', recipeController.postRecipe);

router.get('/add-recipe-detail/:recipeId', recipeController.getAddRecipeDetail);

router.post('/add-ingredient', recipeController.postAddIngredient);

router.post('/add-direction', recipeController.postAddDirection);

router.get('/edit-recipe/:recipeId', recipeController.getEditRecipe);

router.post('/edit-recipe', recipeController.postEditRecipe);

router.post('/delete-recipe', recipeController.postDeleteRecipe);

router.post('/delete-ingredient', recipeController.postDeleteIngredient);

module.exports = router;