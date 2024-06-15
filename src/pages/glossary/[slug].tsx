import { useRouter } from 'next/router';
import React from 'react';
import glossaryTerms from '@/data/glossaryTerms.json';
import { Box, Heading, Image, Text, Stack, List, ListItem, Button, Flex, Divider } from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";

type GlossaryTermsType = {
  [key: string]: string[];
};

const TermPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (typeof slug !== 'string' || !(slug in glossaryTerms)) {
    return <div>Term not found</div>;
  }

  const termInfo = glossaryTerms[slug][0]; // Assuming each term has only one item in the array

	const [selectedTerm, setSelectedTerm] = React.useState<string | null>(null);

  const handleTermClick = (term: string) => {
    setSelectedTerm(term);
  };

  const showAllTerms = () => {
    setSelectedTerm(null);
  };

  return (
    <Flex>
      {/* Left Section: Glossary List */}
      <Box flex="1" p={4}>
        <Heading as="h1" mb={4} textAlign="center">Glossary</Heading>
        <Flex wrap="wrap" justifyContent="center">
          <Button onClick={showAllTerms} mr={1} mb={2}>Show All</Button>
          {/* Render '0-9' button separately */}
          <Button onClick={() => handleTermClick('0-9')} mr={1} mb={2}>0-9</Button>
          {/* Render alphabetical buttons dynamically */}
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            <Button key={letter} onClick={() => handleTermClick(letter)} mr={1} mb={2}>
              {letter}
            </Button>
          ))}
        </Flex>
        <Divider mb={4} />
        <Stack spacing={4}>
          {Object.keys(glossaryTerms).map((letter) => (
            !selectedTerm || selectedTerm === letter ? (
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

      {/* Right Section: Selected Term Details */}
      <Box flex="1" p={4}>
        <Heading as="h1" mb={4} textAlign="center">
          {slug}
        </Heading>
        <Box maxW="400px" mx="auto" mb={4}>
          <Image src={termInfo.image} alt={`${slug} image`} />
        </Box>
        <Text>{termInfo.explanation}</Text>
      </Box>
    </Flex>
  );
};

export default TermPage;