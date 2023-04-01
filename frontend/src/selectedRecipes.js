//selectedRecipes.js

import { Box, Heading, VStack, Text, Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

function SelectedRecipes() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedRecipes = location.state?.selectedRecipes || [];

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Box>
            <VStack spacing={4} mt={10} mb={10}>
                <Heading as="h2" size="xl">
                    Selected Recipes
                </Heading>
                {selectedRecipes.length === 0 ? (
                    <Text>No recipes selected</Text>
                ) : (
                    selectedRecipes.map((recipe) => (
                        <Text key={recipe.id}>{recipe.title}</Text>
                    ))
                )}
                <Button onClick={goBack}>Go Back</Button>
            </VStack>
        </Box>
    );
}

export default SelectedRecipes;