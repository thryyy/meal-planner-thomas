//RecipeCard.js

import React, { useState, useEffect } from 'react';
import {
    AspectRatio,
    Box,
    GridItem,
    VStack,
    Heading,
    Stack,
    Image,
} from '@chakra-ui/react';
import defaultImage from './img/default.jpg';
import ColoredTag from './ColoredTag';


function RecipeCard({ recipe, onTagClick, onSelect, isSelected: initialIsSelected }) {
    const [isImageLoaded, setImageLoaded] = useState(false);
    const [isSelected, setIsSelected] = useState(initialIsSelected);
    const tags = recipe.tags || [];

    const handleCardClick = (event) => {
        event.preventDefault();
        setIsSelected(!isSelected);
        if (onSelect) {
            onSelect(recipe);
        }
    };

    useEffect(() => {
        setIsSelected(initialIsSelected);
    }, [initialIsSelected]);

    return (
        <GridItem colSpan={[1, null, null, 1]} mb={4}>
            <Box
                as="article"
                maxW="sm"
                borderWidth="5px"
                borderRadius="lg"
                overflow="hidden"
                onClick={(event) => handleCardClick(event)}
                borderColor={isSelected ? 'purple.500' : 'transparent'}
                cursor="pointer"
            >
                <AspectRatio ratio={3 / 4}>
                    <Box
                        backgroundImage={`url(${defaultImage})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        position="relative"
                        width="100%"
                    >
                        <Image
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            onLoad={() => setImageLoaded(true)}
                            position="absolute"
                            top="50%"
                            left="0"
                            transform="translateY(-50%)"
                            opacity={isImageLoaded ? 1 : 0}
                            transition="opacity 0.8s ease-in-out"
                            width="100%"
                            objectFit="cover"
                        />
                    </Box>
                </AspectRatio>
                <VStack p="6" align="start" spacing={4} minH="120px">
                    <Heading as="h3" size="lg">
                        <a
                            href={recipe.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {recipe.title}
                        </a>
                    </Heading>
                    <Stack direction="row" spacing={2}>
                        {tags.map((tag) => {
                            return (
                                <ColoredTag
                                    key={tag}
                                    tag={tag}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onTagClick(tag);
                                    }}
                                    cursor="pointer"
                                    variant="card"
                                />
                            );
                        })}
                    </Stack>
                </VStack>
            </Box>
        </GridItem>
    );
}

export default React.memo(RecipeCard);
