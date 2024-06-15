import React from "react";
import glossaryTerms from '@/data/glossaryTerms.json';
import { Box, Heading, Flex, Button, Stack, List, ListItem, Divider } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

type GlossaryTermsType = {
  [key: string]: string[];
};


const GlossaryTerm: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter === selectedLetter ? null : letter);
  };

  const showAllTerms = () => {
    setSelectedLetter(null);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4} textAlign="center">Glossary</Heading>
        <Flex wrap="wrap" justifyContent="center">
          <Button onClick={showAllTerms} mr={1} mb={2}>Show All</Button>
          {/* Render '0-9' button separately */}
          <Button onClick={() => handleLetterClick('0-9')} mr={1} mb={2}>0-9</Button>
          {/* Render alphabetical buttons dynamically */}
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            <Button key={letter} onClick={() => handleLetterClick(letter)} mr={1} mb={2}>
              {letter}
            </Button>
          ))}
        </Flex>
      <Divider mb={4} />
      <Stack spacing={4}>
        {Object.keys(glossaryTerms).map((letter) => (
          !selectedLetter || selectedLetter === letter ? (
            <Box key={letter}>
              <Heading as="h2" size="md" mb={2}>{letter}</Heading>
              <List>
                {glossaryTerms[letter].map((term) => (
                  <ListItem key={term}>
                    <Link href={`/glossary/${encodeURIComponent(term)}`} _hover={{ textDecoration: "underline" }}>{term}</Link>
                    </ListItem>

                ))}
              </List>
            </Box>
          ) : null
        ))}
      </Stack>
    </Box>
  );
};

export default GlossaryTerm;