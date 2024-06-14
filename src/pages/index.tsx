import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const response = await fetch("https://randomuser.me/api/?results=8");
      return response.json();
    },
    select: (data) => data.results
  });

  return (
    <>
      <Container maxW="container.xl" py={6} as="main" minH="100vh">
        <Heading as="h1" size="xl" mb={6}>
          Hello World
        </Heading>
        <Flex gap={4}>
          <Button colorScheme="brand" onClick={onOpen}>
            Click me
          </Button>
          <Link href="/maria">
            <Button colorScheme="brand" variant="outline">
              Go to Maria
            </Button>
          </Link>
        </Flex>

        {isLoading ? (
          <Flex justifyContent="center" alignItems="center" h="50vh">
            <Spinner />
          </Flex>
        ) : (
          <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={6}>
            {data.map((user: any) => (
              <Card key={user.login.uuid}>
                <CardHeader>
                  <Heading as="h3" size="md">
                    {user.name.first}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Flex gap={2} alignItems="center">
                    <Image src={user.picture.thumbnail} alt={user.name.first} borderRadius="full" />

                    <Text textOverflow="ellipsis">{user.login.username}</Text>
                  </Flex>
                </CardBody>
                <CardFooter>{user.phone}</CardFooter>
              </Card>
            ))}
          </Grid>
        )}
      </Container>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>hi there</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
