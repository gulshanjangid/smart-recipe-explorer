const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');


// GET all recipes with filtering

router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
    try {
        const { search, cuisine, isVegetarian, maxPrepTime, difficulty, tags } = req.query;
        let query = {};

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { name: searchRegex },
                { ingredients: searchRegex }
            ];
        }

        if (cuisine) {
            query.cuisine = cuisine;
        }

        if (isVegetarian !== undefined && isVegetarian !== 'null' && isVegetarian !== '') {
            // Handle boolean conversion from query string
            query.isVegetarian = isVegetarian === 'true';
        }

        if (maxPrepTime) {
            query.prepTimeMinutes = { $lte: parseInt(maxPrepTime) };
        }

        if (difficulty) {
            query.difficulty = difficulty;
        }

        if (tags) {
            // Handle comma-separated tags if multiple
            const tagList = Array.isArray(tags) ? tags : tags.split(',');
            query.tags = { $in: tagList };
        }

        const recipes = await Recipe.find(query);
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single recipe by ID
router.get('/:id', async (req, res) => {
    try {
       const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
