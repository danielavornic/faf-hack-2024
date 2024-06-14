import { Link } from "@chakra-ui/next-js";
import { Button, Container, Heading } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";

const MariaPage = () => {
  return (
    <Container maxW="container.xl" py={6} as="main" minH="100vh">
      <Heading as="h1" size="xl" mb={6}>
        Maria
      </Heading>

      <Link href="/">
        <Button colorScheme="brand" variant="outline" leftIcon={<ArrowLeft />}>
          Go back
        </Button>
      </Link>
    </Container>
  );
};

export default MariaPage;
