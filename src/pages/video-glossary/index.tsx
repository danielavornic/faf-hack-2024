import React, { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Container,
  Stack,
  List,
  ListItem,
  Text,
  Button,
  Center,
  Link as ChakraLink,
  Link
} from "@chakra-ui/react";
import { Layout, PageHeader } from "@/components";
import videos from "@/data/videos.json";
import NextLink from "next/link";

type Video = {
  title: string;
  url: string;
  description: string;
};

const VideoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Start with empty string to show all videos
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedVideo(null); // Reset selected video when category changes
  };

  const videoNames = videos as { [key: string]: Video[] };
  const categories = Object.keys(videoNames);

  const showAllVideos = () => {
    setSelectedCategory(""); // Set selectedCategory to empty string to show all videos
    setSelectedVideo(null);
  };

  return (
    <Layout title="Video Glossary">
      {/* Header */}
      <PageHeader
        title="Video Glossary"
        subtitle="Explore our video tutorials and top picks for various categories."
      />
      <Box p={4}>
        <Flex wrap="wrap" justifyContent="center">
          <Button
            onClick={showAllVideos}
            mr={2}
            mb={2}
            _hover={{ background: "#ccc1f4" }}
            color="brand.700"
            fontWeight="bold"
          >
            Show All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryClick(category)}
              mr={2}
              mb={2}
              _hover={{ background: "#ccc1f4" }}
              color="brand.700"
              backgroundColor={selectedCategory === category ? "#ccc1f4" : "gray.100"}
              fontWeight="bold"
            >
              {category}
            </Button>
          ))}
        </Flex>
        <Flex wrap="wrap" justifyContent="center">
          <Stack spacing={4}>
            {(selectedCategory === "" ? categories : [selectedCategory]).map((category) => (
              <Box key={category}>
                <Center>
                  <Heading as="h2" size="md" mb={2} color="brand.700" fontWeight="bold" mt={6}>
                    {category}
                  </Heading>
                </Center>
                <List display="flex" justifyContent="center" alignItems="center">
                  {videoNames[category as any]?.map((video: Video, index: number) => {
                    return (
                      <React.Fragment key={video.title}>
                        <ListItem py={1} display="inline">
                          <Link
                            borderRadius={"md"}
                            margin={"0 8px"}
                            padding={"6px 8px"}
                            href={`/video-glossary/${encodeURIComponent(video.title)}`}
                            _hover={{
                              background: "#ccc1f4"
                            }}
                            fontWeight="500"
                            textAlign="center" // Center align the link content
                            whiteSpace="nowrap" // Prevent wrapping of long terms
                            minWidth="0"
                          >
                            {video.title}
                          </Link>
                        </ListItem>
                        {index < videos[category as unknown]?.length - 1 && " | "}
                      </React.Fragment>
                    );
                  })}
                </List>
              </Box>
            ))}
          </Stack>
        </Flex>
      </Box>
    </Layout>
  );
};

export default VideoPage;
