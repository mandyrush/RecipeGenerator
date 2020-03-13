const Recipe = require('../models/recipe');

exports.getIndex = (req, res, next) => {
  res.render('recipe/index', {
    pageTitle: 'Recipes',
    path: '/'
  })
};

exports.getRecipes = (req, res, next) => {
  Recipe.find({userId: req.session.user._id })
    .then(recipes => {
      res.render('recipe/recipes', {
        pageTitle: 'My Recipes',
        recipes: recipes,
        path: '/recipes'
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
        recipe: recipe,
        path: '/recipes'
      })
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getAddRecipe = (req, res, next) => {
  res.render('recipe/add-recipe', {
    pageTitle: 'Add Recipe',
    path: '/recipes'
  })
};

exports.postRecipe = (req, res, next) => {
  const title = req.body.title;
  const mealType = req.body.mealType;
  const imageUrl = req.body.imageUrl;
  const recipe = new Recipe({
    title: title,
    mealType: mealType,
    imageUrl: imageUrl,
    userId: req.session.user._id
  });
  recipe.save()
    .then(recipe => {
      console.log(recipe);
      res.redirect('/add-recipe-detail/' + recipe._id);
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getAddRecipeDetail = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then(recipe => {
      res.render('recipe/add-recipe-detail', {
        pageTitle: 'Add Ingredient',
        recipe: recipe,
        path: '/recipes'
      })
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postAddIngredient = (req, res, next) => {
  const editMode = req.query.edit;
  const recipeId = req.body.recipeId;
  const ingredient = req.body.ingredient;
  const measurementUnit = req.body.measurementUnit;
  let currentRecipe = {};
  const quantity = req.body.quantity;
  Recipe.findById(recipeId)
    .then(recipe => {
      if(recipe.userId.toString() !== req.session.user._id.toString()) {
        res.redirect('/')
      }
      recipe.addIngredient({
        quantity: quantity,
        measurementUnit: measurementUnit,
        ingredient: ingredient
      });
      currentRecipe = recipe;
    })
    .then(result => {
      if(editMode === 'true') {
        return res.render('recipe/edit-recipe', {
          pageTitle: 'Edit Recipe',
          recipe: currentRecipe,
          path: '/recipes'
        })
      } else {
        return res.render('recipe/add-recipe-detail', {
          pageTitle: 'Add Ingredient',
          recipe: currentRecipe,
          path: '/recipes'
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
};

exports.postAddDirection = (req, res, next) => {
  const editMode = req.query.edit;
  const recipeId = req.body.recipeId;
  const direction = req.body.direction;
  let currentRecipe = {};
  Recipe.findById(recipeId)
    .then(recipe => {
      if(recipe.userId.toString() !== req.session.user._id.toString()) {
        res.redirect('/')
      }
      recipe.addDirection({
        direction: direction
      });
      currentRecipe = recipe;
    })
    .then(result => {
      if(editMode) {
        return res.render('recipe/edit-recipe', {
          pageTitle: 'Edit Recipe',
          recipe: currentRecipe,
          path: '/recipes'
        })
      } else {
        return res.render('recipe/add-recipe-detail', {
          pageTitle: 'Add Ingredient',
          recipe: currentRecipe,
          path: '/recipes'
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
};

exports.getEditRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then(recipe => {
      res.render('recipe/edit-recipe', {
        pageTitle: 'Edit Recipe',
        recipe: recipe,
        path: '/recipes'
      })
    })
    .catch(error => {
      console.log(error);
    })
};

exports.postEditRecipe = (req, res, next) => {
  const recipeId = req.body.recipeId;
  const updatedTitle = req.body.title;
  const updatedMealType = req.body.mealType;
  const updatedImageUrl = req.body.imageUrl;
  Recipe.findById(recipeId)
    .then(recipe => {
      if(recipe.userId.toString() !== req.session.user._id.toString()) {
        res.redirect('/')
      }
      recipe.title = updatedTitle;
      recipe.mealType = updatedMealType;
      recipe.imageUrl = updatedImageUrl;
      return recipe.save()
        .then(result => {
          res.redirect('/recipes');
        })
    })
    .catch(error => {
      console.log(error);
    })
};

exports.postDeleteRecipe = (req, res, next) => {
  const recipeId = req.body.recipeId;
  Recipe.deleteOne({ _id: recipeId, userId: req.session.user._id })
    .then(result => {
      console.log('Recipe Deleted');
      res.redirect('/recipes');
    })
    .catch(error => {
      console.log(error);
    })
};

exports.postDeleteIngredient = (req, res, next) => {
  const ingredientId = req.body.ingredientId;
  const recipeId = req.body.recipeId;
  let currentRecipe;
  Recipe.findById(recipeId)
    .then(recipe => {
      if(recipe.userId.toString() !== req.session.user._id.toString()) {
        res.redirect('/')
      }
      recipe.deleteIngredient(ingredientId);
      currentRecipe = recipe;
    })
    .then(result => {
      return res.render('recipe/edit-recipe', {
        pageTitle: 'Edit Recipe',
        recipe: currentRecipe,
        path: '/recipes'
      })
    })
    .catch(error => {
      console.log(error);
    })
};

exports.postDeleteDirection = (req, res, next) => {
  const directionId = req.body.directionId;
  const recipeId = req.body.recipeId;
  let currentRecipe;
  Recipe.findById(recipeId)
    .then(recipe => {
      if(recipe.userId.toString() !== req.session.user._id.toString()) {
        res.redirect('/')
      }
      recipe.deleteDirection(directionId);
      currentRecipe = recipe;
    })
    .then(result => {
      return res.render('recipe/edit-recipe', {
        pageTitle: 'Edit Recipe',
        recipe: currentRecipe,
        path: '/recipes'
      })
    })
    .catch(error => {
      console.log(error);
    })
};
