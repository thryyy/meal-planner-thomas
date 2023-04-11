import express from 'express';
import { getAllRecipes } from './recipes.js';
import { shuffleArray } from './utils.js';
import notion from './notion.js';

const {  DATABASE_ID } = process.env;

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Fetch all recipes
        const recipes = await getAllRecipes(DATABASE_ID, notion);

        // Shuffle the recipes array
        const shuffledRecipes = shuffleArray(recipes);

        // Select the first 5 recipes as the meal plan
        const mealPlan = shuffledRecipes.slice(0, 5);

        res.json(mealPlan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching meal plan' });
    }
});

export default router;