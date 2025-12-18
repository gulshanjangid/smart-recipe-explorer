const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  isVegetarian: { type: Boolean, required: true },
  prepTimeMinutes: { type: Number, required: true },
  ingredients: [{ type: String, required: true }],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  instructions: { type: String, required: true },
  tags: [{ type: String }],
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
