const Recipe = require('../models/recipe');

exports.getIndex = (req, res, next) => {
  res.render('recipe/index', {
    pageTitle: 'Recipes'
  })
};

exports.getRecipes = (req, res, next) => {
  Recipe.find()
    .then(recipes => {
      res.render('recipe/recipes', {
        pageTitle: 'My Recipes',
        recipes: recipes
      })
    })
    .catch(error => {
      console.log(error);
    });

};

exports.getRecipe = (req, res, next) => {
  res.render('recipe/recipe-detail', {
    pageTitle: 'Recipe Detail'
  })
};

exports.getAddRecipe = (req, res, next) => {
  res.render('recipe/add-recipe', {
    pageTitle: 'Add Recipe'
  })
};

exports.postRecipe = (req, res, next) => {
  const title = req.body.title;
  const mealType = req.body.mealType;
  const imageUrl = req.body.imageUrl;
  const recipe = new Recipe({
    title: title,
    mealType: mealType,
    imageUrl: imageUrl
  });
  recipe.save()
    .then(recipe => {
      console.log(recipe);
      res.redirect('/add-ingredient/' + recipe._id);
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getAddIngredient = (req, res, next) => {
  const recipeId = req.params.recipeId;
  res.render('recipe/add-ingredient', {
    pageTitle: 'Add Ingredient',
    recipeId: recipeId
  })
};

exports.postAddIngredient = (req, res, next) => {
  const ingredient = req.body.ingredient;
  const quantity = req.body.quantity;
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then(recipe => {
      recipe.addIngredient({
        quantity: quantity,
        ingredient: ingredient
      })
    })
    .then(result => {
      res.redirect('/add-ingredient/' + recipeId);
    })
    .catch(error => {
      console.log(error);
    })
};
