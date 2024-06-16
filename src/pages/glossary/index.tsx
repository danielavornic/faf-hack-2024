import React from "react";
import glossaryTerms from "@/data/glossaryTerms.json";
import {
  Box,
  Heading,
  Flex,
  Button,
  Stack,
  List,
  ListItem,
  Divider,
  Center,
  Link
} from "@chakra-ui/react";
import { Layout, PageHeader } from "@/components";

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
      <PageHeader
        title="Glossary"
        subtitle="Learn more about common terms used in the tech industry."
      />
      <Box p={4}>
        <Flex wrap="wrap" justifyContent="center">
          <Button
            onClick={showAllTerms}
            mr={1}
            mb={2}
            _hover={{ background: "#ccc1f4" }}
            color="brand.700"
            fontWeight={"bold"}
          >
            Show All
          </Button>
          {/* Render '0-9' button separately */}
          <Button
            onClick={() => handleLetterClick("0-9")}
            mr={1}
            mb={2}
            color="brand.700"
            fontWeight={"bold"}
            _hover={{ background: "#ccc1f4" }}
            backgroundColor={selectedLetter === "0-9" ? "#ccc1f4" : "gray.100"}
          >
            0-9
          </Button>
          {/* Render alphabetical buttons dynamically */}
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <Button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              mr={1}
              mb={2}
              _hover={{ background: "#ccc1f4" }}
              color="brand.700"
              backgroundColor={selectedLetter === letter ? "#ccc1f4" : "gray.100"}
              fontWeight={"bold"}
            >
              {letter}
            </Button>
          ))}
        </Flex>
        <Flex wrap="wrap" justifyContent="center">
          <Stack spacing={4}>
            {Object.keys(glossaryTerms).map(
              (letter: any) =>
                (!selectedLetter || selectedLetter === letter) && (
                  <Box key={letter}>
                    <Center>
                      <Heading
                        as="h2"
                        size="md"
                        mb={2}
                        color="brand.700"
                        fontWeight={"bold"}
                        mt={6}
                      >
                        {letter}
                      </Heading>
                    </Center>
                    <List display="flex" justifyContent="center" alignItems="center">
                      {glossaryTerms[letter as any]?.map((term: any, index: number) => {
                        return (
                          <React.Fragment key={term}>
                            <ListItem py={1} display="inline">
                              <Link
                                borderRadius={"md"}
                                margin={"0 8px"}
                                padding={"6px 8px"}
                                href={`/glossary/${encodeURIComponent(term)}`}
                                _hover={{
                                  background: "#ccc1f4"
                                }}
                                fontWeight="500"
                                textAlign="center" // Center align the link content
                                whiteSpace="nowrap" // Prevent wrapping of long terms
                                minWidth="0" // Ensure terms can shrink if needed
                              >
                                {term}
                              </Link>
                            </ListItem>
                            {index < glossaryTerms[letter as unknown]?.length - 1 && " | "}
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </Box>
                )
            )}
          </Stack>
        </Flex>
      </Box>
    </Layout>
  );
};

export default Glossary;
