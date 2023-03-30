// index.js

import express from 'express';
import dotenv from 'dotenv';
// import EdamamClient from './edamam.js';
import notion from './notion.js';
// import { groupBy, sumBy } from "lodash";
// import { arrayFrom } from './utils.js';
import { getRecipesRoute } from './recipes.js';
import mealPlanRouter from './mealplan.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
// const edamamClient = new EdamamClient(process.env.EDAMAM_APP_ID, process.env.EDAMAM_APP_KEY);
export const databaseId = process.env.DB_ID;

app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/', express.static(path.join(__dirname, '../frontend/build')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/api/recipes', getRecipesRoute(databaseId, notion));

app.use('/api/mealplan', mealPlanRouter);


// Error handling middleware
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});