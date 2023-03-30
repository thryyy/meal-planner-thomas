// routes/recipes.js

export function getRecipesRoute(databaseId, notion) {
    return async (req, res, next) => {
        try {
            const recipes = await getAllRecipes(databaseId, notion);
            res.json(recipes);
        } catch (error) {
            next(error);
        }
    };
}

async function getAllRecipes(databaseId, notion) {
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: "Tags",
            multi_select: { contains: "Rotation" },
        },
    });

    console.log("Notion Response:", JSON.stringify(response, null, 2));

    return response.results.map((recipe) => ({
        id: recipe.id,
        title: recipe.properties[""].title[0].plain_text,
        url: recipe.properties.Link.url,
        imageUrl: recipe.cover?.file?.url || "",
        tags: recipe.properties.Tags.multi_select.map((tag) => tag.name),
    }));
}


export { getAllRecipes };