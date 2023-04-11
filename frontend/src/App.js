//App.js

import { useState, useEffect } from 'react';
import { Box, Input, Stack, Button, Wrap, WrapItem, Grid } from '@chakra-ui/react';
import RecipeCard from './RecipeCard';
import ColoredTag from './ColoredTag';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import SelectedRecipesCard from './SelectedRecipesCard';
const { REACT_APP_BACKEND_URL } = process.env

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/api/recipes`);
        console.log('Response headers:', response.headers);
        const data = await response.json();
        const randomizedData = data.sort(() => Math.random() - 0.5);
        setRecipes(randomizedData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const uniqueTags = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.tags))
  );

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedTags.length === 0 ||
        selectedTags.every((tag) => recipe.tags.includes(tag)))
  );

  const onTagClick = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };
  const handleRecipeSelect = (recipe) => {
    if (selectedRecipes.includes(recipe)) {
      setSelectedRecipes(selectedRecipes.filter((r) => r !== recipe));
    } else {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
  };

  const applySelectedRecipes = () => {
    navigate('/selected-recipes', { state: { selectedRecipes: selectedRecipes } });
  };

  return (
    <>
      <Box className="App">
        <Stack mt={10} ml={20} mr={20} mb={10} direction="row" justifyContent="space-between">
          <Input
            type="text"
            placeholder="Cherche ici Papi"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            size="lg"
            rounded="lg"
            p={4}
            borderWidth={2}
            borderColor="gray.300"
            width="100%"
          />
          <Button onClick={applySelectedRecipes} disabled={!selectedRecipes.length}>
            Apply
          </Button>
        </Stack>
        <SelectedRecipesCard
          recipes={selectedRecipes}
          onUnselect={(recipe) => {
            setSelectedRecipes(selectedRecipes.filter((r) => r.id !== recipe.id));
          }}
        />
        <Wrap spacing={4} ml={40} mr={40} mb={10} mt={10} justify="center">
          {uniqueTags.map((tag) => (
            <WrapItem key={tag}>
              <ColoredTag
                tag={tag}
                isSelected={selectedTags.includes(tag)}
                onClick={() => onTagClick(tag)}
                cursor="pointer"
                variant="search"
              />
            </WrapItem>
          ))}
        </Wrap>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} px={[2, null, null, 8]}>
          {filteredRecipes
            .sort((a, b) => (a.imageUrl ? -1 : 1))
            .map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onTagClick={onTagClick}
                onSelect={handleRecipeSelect}
                isSelected={selectedRecipes.includes(recipe)}
              />
            ))}
        </Grid>
      </Box>
      <Outlet />
    </>
  );
}

export default App;