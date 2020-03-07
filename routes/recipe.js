const express = require('express');

const recipeController = require('../controllers/recipe');

const router = express.Router();

router.get('/', recipeController.getIndex);

module.exports = router;