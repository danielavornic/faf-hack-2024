import { useRouter } from 'next/router';
import React from 'react';
import glossaryTerms from '@/data/terms.json';
import glossaryByLetter from '@/data/glossaryTerms.json';
import { Box, Heading, Image, Text, Stack, List, ListItem, Button, Flex, Divider } from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";
import { Layout } from '@/components';

type GlossaryTermsType = {
  [key: string]: string[];
};

const TermPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Ensure slug is a string and exists in glossaryTerms
  if (typeof slug !== 'string' || !(slug in glossaryTerms)) {
    return <div>Term not found</div>;
  }

  // Extract the term info from glossaryTerms based on the slug
  const termInfo = glossaryTerms[slug][0]; // Assuming each term has only one item in the array
  const [selectedTerm, setSelectedTerm] = React.useState<string | null>(null);

  return (
		<Layout title="Glossary">
			<Box>
				{/* Header */}
				<Box as="header" p={4} textAlign="center">
					<Heading as="h1" color="brand.900">Glossary</Heading>
				</Box>
				<Flex>
					{/* Left Section: Glossary List */}
					<Box flex="1" p={4} maxW="26%" maxH="80vh" overflowY="auto" overflowX="hidden" className="custom-scrollbar">
						<Divider mb={4} />
						<Stack spacing={4}>
							{Object.keys(glossaryByLetter).map((letter) => (
								!selectedTerm || selectedTerm === letter ? (
									<Box key={letter}>
										<Heading as="h2" size="md" mb={2} color="brand.700">{letter}</Heading>
										<List justifyContent="center" alignItems="center">
											{glossaryByLetter[letter].map((term) => (
												<ListItem key={term}>
													<Link 
														href={`/glossary/${encodeURIComponent(term)}`} 
														borderRadius="md"
														margin="0 8px"
														padding="4px 6px"
														_hover={{ 
															background: "#ccc1f4",
														}}
														textAlign="center" // Center align the link content
														whiteSpace="nowrap" // Prevent wrapping of long terms
														minWidth="0" // Ensure terms can shrink if needed
													>{term}</Link>
												</ListItem>
											))}
										</List>
									</Box>
								) : null
							))}
						</Stack>
					</Box>

					{/* Right Section: Selected Term Details */}
					<Box flex="1" p={4} mr="4">
						<Heading as="h1" mb={4} textAlign="center" color="brand.900">
							{slug}
						</Heading>
						<Box maxW="400px" mx="auto" mb={4}>
							<Image src={termInfo.image} alt={`${slug} image`} />
						</Box>
						<Text textAlign="justify">{termInfo.explanation}</Text>
					</Box>
				</Flex>
			</Box>
		</Layout>
  );
};

export default TermPage;