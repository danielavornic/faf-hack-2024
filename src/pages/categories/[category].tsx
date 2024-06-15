import { Layout } from "@/components";
import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <Layout title={`Category: ${category}`}>
      <Box p={8}>
        <Heading as="h1" mb={4} textAlign="center">
          {category}
        </Heading>
      </Box>
    </Layout>
  );
};

export default CategoryPage;
