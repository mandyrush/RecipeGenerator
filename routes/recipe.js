const express = require('express');

const recipeController = require('../controllers/recipe');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', recipeController.getIndex);

router.get('/recipes', isAuth, recipeController.getRecipes);

router.get('/recipe/:recipeId', isAuth, recipeController.getRecipe);

router.get('/add-recipe', isAuth, recipeController.getAddRecipe);

router.post('/add-recipe', isAuth, recipeController.postRecipe);

router.get('/add-recipe-detail/:recipeId', isAuth, recipeController.getAddRecipeDetail);

router.post('/add-ingredient', isAuth, recipeController.postAddIngredient);

router.post('/add-direction', isAuth, recipeController.postAddDirection);

router.get('/edit-recipe/:recipeId', isAuth, recipeController.getEditRecipe);

router.post('/edit-recipe', isAuth, recipeController.postEditRecipe);

router.post('/delete-recipe', isAuth, recipeController.postDeleteRecipe);

router.post('/delete-ingredient', isAuth, recipeController.postDeleteIngredient);

router.post('/delete-direction', isAuth, recipeController.postDeleteDirection);

module.exports = router;