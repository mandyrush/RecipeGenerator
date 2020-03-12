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
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then(recipe => {
      res.render('recipe/recipe-detail', {
        pageTitle: 'Recipe Detail',
        recipe: recipe
      })
    })
    .catch(error => {
      console.log(error);
    });
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
  Recipe.findById(recipeId)
    .then(recipe => {
      res.render('recipe/add-recipe-detail', {
        pageTitle: 'Add Ingredient',
        recipe: recipe
      })
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postAddIngredient = (req, res, next) => {
  const recipeId = req.params.recipeId;
  const ingredient = req.body.ingredient;
  const measurementUnit = req.body.measurementUnit;
  let currentRecipe = {};
  const quantity = req.body.quantity;
  Recipe.findById(recipeId)
    .then(recipe => {
      currentRecipe = recipe;
      recipe.addIngredient({
        quantity: quantity,
        measurementUnit: measurementUnit,
        ingredient: ingredient
      })
    })
    .then(result => {
      return res.render('recipe/add-recipe-detail', {
        pageTitle: 'Add Ingredient',
        recipe: currentRecipe
      })
    })
    .catch(error => {
      console.log(error);
    })
};

exports.postAddDirection = (req, res, next) => {
  const recipeId = req.params.recipeId;
  const direction = req.body.direction;
  let currentRecipe = {};
  Recipe.findById(recipeId)
    .then(recipe => {
      currentRecipe = recipe;
      recipe.addDirection({
        direction: direction
      })
    })
    .then(result => {
      return res.render('recipe/add-recipe-detail', {
        pageTitle: 'Add Ingredient',
        recipe: currentRecipe
      })
    })
    .catch(error => {
      console.log(error);
    })
};

exports.postDeleteRecipe = (req, res, next) => {
  const recipeId = req.body.recipeId;
  Recipe.deleteOne({ _id: recipeId})
    .then(result => {
      console.log('Recipe Deleted');
      res.redirect('/recipes');
    })
    .catch(error => {
      console.log(error);
    })
};
