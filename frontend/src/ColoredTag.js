// ColoredTag.js
import { Box } from '@chakra-ui/react';

const ColoredTag = ({ tag, isSelected, variant, ...props }) => {
    const bgColor = {
        Rotation: 'orange.500',
        Protein: 'red.500',
        Carb: 'yellow.500',
        Veggie: 'green.500',
        Batch: 'blue.500',
        default: 'gray.500',
    };

    const hoverBgColor = {
        Rotation: 'purple.700',
        Protein: 'red.700',
        Carb: 'yellow.700',
        Veggie: 'green.700',
        Batch: 'blue.700',
        default: 'gray.700',
    };

    const selectedBgColor = {
        Rotation: 'purple.900',
        Protein: 'red.900',
        Carb: 'yellow.900',
        Veggie: 'green.900',
        Batch: 'blue.900',
        default: 'gray.900',
    };

    const isSelectedSearch = isSelected && variant === 'search';

    return (
        <Box
            bg={
                isSelectedSearch
                    ? selectedBgColor[tag] || selectedBgColor.default
                    : bgColor[tag] || bgColor.default
            }
            color="white"
            fontSize="sm"
            fontWeight="bold"
            p={2}
            borderRadius="md"
            _hover={{
                backgroundColor:
                    variant === 'search'
                        ? hoverBgColor[tag] || hoverBgColor.default
                        : bgColor[tag] || bgColor.default,
                color: 'white',
            }}
            textTransform="capitalize"
            {...props}
        >
            {tag}
        </Box>
    );
};

export default ColoredTag;
