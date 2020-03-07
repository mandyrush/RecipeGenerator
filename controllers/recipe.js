exports.getIndex = (req, res, next) => {
  res.render('recipe/index', {
    pageTitle: 'Recipes'
  })
};