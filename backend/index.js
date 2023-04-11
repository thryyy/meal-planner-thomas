import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import notion from './notion.js';

// Local imports
import { getRecipesRoute } from './recipes.js';
import mealPlanRouter from './mealplan.js';

dotenv.config();

const app = express();
const { PORT, DATABASE_ID } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware configurations
function setupMiddlewares() {
  app.use(cors()); // Enable CORS
  app.use(express.json()); // Enable JSON parsing
}

setupMiddlewares();

// API routes
app.get('/api/recipes', getRecipesRoute(DATABASE_ID, notion));
app.use('/api/mealplan', mealPlanRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});