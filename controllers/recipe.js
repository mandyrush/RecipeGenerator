exports.getIndex = (req, res, next) => {
  res.render('recipe/index', {
    pageTitle: 'Recipes'
  })
};

exports.getRecipes = (req, res, next) => {
  res.render('recipe/recipes', {
    pageTitle: 'My Recipes'
  })
};

exports.getRecipe = (req, res, next) => {
  res.render('recipe/recipe-detail', {
    pageTitle: 'Recipe Detail'
  })
};

exports.addRecipe = (req, res, next) => {
  res.render('recipe/add-recipe', {
    pageTitle: 'Add Recipe'
  })
};