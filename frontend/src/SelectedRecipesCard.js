// SelectedRecipesCard.js

import { Box, VStack, Text, HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

function SelectedRecipesCard({ recipes, onUnselect }) {
    const handleUnselect = (event, recipe) => {
        event.stopPropagation();
        onUnselect(recipe);
    };
    return (

        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            borderColor="gray.300"
            p={4}
            mt={4}
            width="100%"
            backgroundColor="white"
        >
            {recipes.length === 0 ? (
                <Text>No recipes selected</Text>
            ) : (
                <HStack spacing={2} align="start" wrap="wrap">
                    {recipes.map((recipe) => (
                        <Tag
                            size="md"
                            key={recipe.id}
                            borderRadius="full"
                            variant="solid"
                            bg="purple.500"
                        >
                            <TagLabel>{recipe.title}</TagLabel>
                            <TagCloseButton onClick={(event) => handleUnselect(event, recipe)} />
                        </Tag>
                    ))}
                </HStack>
            )}
        </Box>
    );
}

export default SelectedRecipesCard;
