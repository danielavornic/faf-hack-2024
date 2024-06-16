import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Flex,
  Container,
  Text,
  Stack,
  List,
  ListItem,
  Link as ChakraLink,
  SimpleGrid
} from "@chakra-ui/react";
import { Layout, PageHeader } from "@/components";
import videoData from "@/data/videos.json";
import ReactPlayer from "react-player";
import NextLink from "next/link";

type Video = {
  title: string;
  url: string;
  description: string;
};

const VideoDetailsPage = () => {
  const router = useRouter();
  const { video } = router.query;

  if (!video) {
    return (
      <Layout title="Loading...">
        <PageHeader title="Loading..." subtitle="" />
        <Container>
          <Text>Loading...</Text>
        </Container>
      </Layout>
    );
  }

  let selectedVideo: Video | undefined;
  let selectedCategory: string | undefined;

  for (const category in videoData) {
    const foundVideo = videoData[category].find((vid: Video) => vid.title === video);
    if (foundVideo) {
      selectedVideo = foundVideo;
      selectedCategory = category;
      break;
    }
  }

  if (!selectedVideo) {
    return (
      <Layout title="Video Not Found">
        <PageHeader
          title="Video Not Found"
          subtitle="The video you are looking for does not exist."
        />
        <Container>
          <Text>The video you are looking for does not exist.</Text>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout title={selectedVideo.title} className="bg-[#fbfaff]">
      <PageHeader
        title={selectedVideo.title}
        subtitle="Watch and learn from our video tutorials."
      />
      <Container maxW="8xl" py={6}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
          <Box
            flex="1"
            p={4}
            overflowY="auto"
            borderRadius="12px"
            borderWidth="1px"
            borderColor="gray.300"
            backgroundColor="white"
            gridColumn={{ base: "1 / -1", md: "span 1" }} // 2 out of 5 columns
          >
            <Stack
              spacing={4}
              maxH="75vh"
              className="custom-scrollbar overflow-y-auto"
              overflowX="hidden"
            >
              {Object.keys(videoData).map((category) => (
                <Box key={category}>
                  <Heading as="h2" size="md" mb={2} color="brand.700">
                    {category}
                  </Heading>
                  <List justifyContent="center" alignItems="center">
                    {videoData[category].map((vid: Video) => (
                      <ListItem key={vid.title}>
                        <NextLink
                          href={`/video-glossary/${encodeURIComponent(vid.title)}`}
                          passHref
                        >
                          <ChakraLink
                            borderRadius="md"
                            margin="0 8px"
                            padding="4px 6px"
                            _hover={{ background: "#ccc1f4" }}
                            textAlign="center"
                            whiteSpace="nowrap"
                            minWidth="0"
                          >
                            {vid.title}
                          </ChakraLink>
                        </NextLink>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Stack>
          </Box>
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
            maxW="100%"
            mx="auto"
            p={8}
            gridColumn={{ base: "1 / -1", md: "span 2" }} // 3 out of 5 columns
            className="aspect-w-4 aspect-h-3" // Custom aspect ratio
          >
            <Heading as="h1" mb={4} textAlign="center" color="brand.900">
              {selectedVideo.title}
            </Heading>
            <Box
              p={4}
              bg="white"
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="sm"
              w="100%"
              h="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <ReactPlayer
                url={selectedVideo.url}
                controls
                width="100%"
                height="100%"
                style={{ borderRadius: "12px" }}
              />
              <Text textAlign="justify" mt={4}>
                {selectedVideo.description}
              </Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default VideoDetailsPage;
