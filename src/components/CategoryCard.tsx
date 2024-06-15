import React from "react";
import { Box, Image, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  image: string;
  category: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, category }) => {
  return (
    <Link href={`/categories/${category}`} passHref>
      <Box
        w="full"
        bg="white"
        _dark={{ bg: "gray.800" }}
        rounded="lg"
        overflow="hidden"
        mx={4}
        my={4}
        className="group"
        borderWidth="1px"
        borderColor="gray.400"
        _hover={{ borderColor: "brand.500" }}
      >
        <div className="relative">
          <div className="absolute z-[1] h-full w-full bg-brand-400 opacity-20 transition-opacity duration-300"></div>
          <Image w="full" h={52} fit="cover" src={image} alt={title} />
        </div>
        <Box py={4} textAlign="center">
          <ChakraLink
            display="block"
            fontSize="l"
            color="brand.900"
            _dark={{ color: "white" }}
            fontWeight="bold"
            _hover={{ color: "brand.700" }}
          >
            {title}
          </ChakraLink>
        </Box>
      </Box>
    </Link>
  );
};

export default CategoryCard;
