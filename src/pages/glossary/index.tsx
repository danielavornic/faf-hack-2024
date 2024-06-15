import React from "react";
import glossaryTerms from "@/data/glossaryTerms.json";
import { Box, Heading, Flex, Button, Stack, List, ListItem, Divider, Center, Link } from "@chakra-ui/react";
import { Layout } from "@/components";

type GlossaryTermsType = {
  [key: string]: string[];
};

const Glossary: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter === selectedLetter ? null : letter);
  };

  const showAllTerms = () => {
    setSelectedLetter(null);
  };

  return (
    <Layout title="Glossary">
      <Box p={4}>
        <Heading as="h1" mb={4} textAlign="center" color="brand.900">
          Glossary
        </Heading>
        <Flex wrap="wrap" justifyContent="center">
          <Button onClick={showAllTerms} mr={1} mb={2} _hover={{ background: "#ccc1f4"}} color="brand.700" fontWeight={"bold"}>
            Show All
          </Button>
          {/* Render '0-9' button separately */}
          <Button onClick={() => handleLetterClick("0-9")} mr={1} mb={2} color="brand.700" fontWeight={"bold"}>
            0-9
          </Button>
          {/* Render alphabetical buttons dynamically */}
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <Button key={letter} onClick={() => handleLetterClick(letter)} mr={1} mb={2} _hover={{ background: "#ccc1f4",}} color="brand.700" fontWeight={"bold"}>
              {letter}
            </Button>
          ))}
        </Flex>
        <Divider mb={4} />
        <Flex wrap="wrap" justifyContent="center">
          <Stack spacing={4}>
            {Object.keys(glossaryTerms).map((letter) => (
              (!selectedLetter || selectedLetter === letter) && (
                <Box key={letter}>
                  <Center>
                    <Heading as="h2" size="md" mb={2} color="brand.700" fontWeight={"bold"} mt={6}>
                      {letter}
                    </Heading>
                  </Center>
                  <List display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {glossaryTerms[letter as keyof GlossaryTermsType].map((term, index) => (
                      <React.Fragment key={term}>
                        <ListItem py={1} display="inline">
                          <Link
                            borderRadius={"md"}
                            margin={"0 8px"}
                            padding={"4px 6px"}
                            href={`/glossary/${encodeURIComponent(term)}`}
                            _hover={{ 
                              background: "#ccc1f4",
                            }}
                            textAlign="center" // Center align the link content
                            whiteSpace="nowrap" // Prevent wrapping of long terms
                            minWidth="0" // Ensure terms can shrink if needed
                          >
                            {term}
                          </Link>
                        </ListItem>
                        {index < glossaryTerms[letter as keyof GlossaryTermsType].length - 1 && " | "}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )
            ))}
          </Stack>
        </Flex>
      </Box>
    </Layout>
  );
};

export default Glossary;