import { useRouter } from "next/router";
import React from "react";
import glossaryTerms from "@/data/terms.json";
import glossaryByLetter from "@/data/glossaryTerms.json";
import {
  Box,
  Heading,
  Image,
  Text,
  Stack,
  List,
  ListItem,
  Flex,
  Container
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Layout, PageHeader } from "@/components";

type GlossaryTermsType = {
  [key: string]: string[];
};

const TermPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Ensure slug is a string and exists in glossaryTerms
  if (typeof slug !== "string" || !(slug in glossaryTerms)) {
    return <div>Term not found</div>;
  }

  // Extract the term info from glossaryTerms based on the slug
  const termInfo = glossaryTerms[slug][0]; // Assuming each term has only one item in the array
  const [selectedTerm, setSelectedTerm] = React.useState<string | null>(null);

  return (
    <Layout title="Glossary" className="bg-[#fbfaff]">
      {/* Header */}
      <PageHeader
        title="Glossary"
        subtitle="Learn more about common terms used in the tech industry."
      />
      <Container maxW="8xl" py={6} className="flex items-center justify-between py-2">
        <Flex>
          {/* Left Section: Glossary List */}
          <Box
            flex="1"
            p={4}
            maxW="26%"
            overflowY="auto"
            // className="custom-scrollbar sticky top-[185px]"
            borderRadius="12px" // Rounded corners
            borderWidth="1px"
            borderColor="gray.300"
            backgroundColor="white"
          >
            <Stack
              spacing={4}
              maxH="75vh"
              className="custom-scrollbar overflow-y-auto"
              overflowX="hidden"
            >
              {Object.keys(glossaryByLetter).map((letter) =>
                !selectedTerm || selectedTerm === letter ? (
                  <Box key={letter}>
                    <Heading as="h2" size="md" mb={2} color="brand.700">
                      {letter}
                    </Heading>
                    <List justifyContent="center" alignItems="center">
                      {glossaryByLetter[letter as any].map((term) => (
                        <ListItem key={term}>
                          <Link
                            href={`/glossary/${encodeURIComponent(term)}`}
                            borderRadius="md"
                            margin="0 8px"
                            padding="4px 6px"
                            _hover={{
                              background: "#ccc1f4"
                            }}
                            textAlign="center" // Center align the link content
                            whiteSpace="nowrap" // Prevent wrapping of long terms
                            minWidth="0" // Ensure terms can shrink if needed
                          >
                            {term}
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ) : null
              )}
            </Stack>
          </Box>

          {/* Right Section: Selected Term Details */}
          <Flex flexDir="column" alignItems="center" flex="1" pl={8} mr="4">
            <Heading as="h1" mb={4} textAlign="center" color="brand.900">
              {slug}
            </Heading>
            <div
              className="mb-8 h-[380px] w-full rounded-[12px] border border-gray-300 bg-cover bg-center"
              style={{ backgroundImage: `url(${termInfo.image})` }}
            />
            {/* <Image src={termInfo.image} alt={`${slug} image`} /> */}
            <Text textAlign="justify">{termInfo.explanation}</Text>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default TermPage;
