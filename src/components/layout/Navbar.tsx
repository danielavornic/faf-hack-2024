import {
  Avatar,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  chakra,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Link } from "@chakra-ui/next-js";
import { Cpu } from "lucide-react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai"; // Importing the search icon

export const Navbar = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const mobileNav = useDisclosure();
  const bg = useColorModeValue("white", "gray.800");

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div
      className={clsx("relative z-[1] w-full border-b border-white border-opacity-30 !text-white", {
        "bg-black": !isHome
      })}
    >
      <Container maxW="8xl" py={3} className="flex items-center justify-between py-2">
        <Flex alignItems="center">
          <Link
            href="/"
            display="flex"
            alignItems="center"
            className="text-nowrap hover:opacity-80"
            _hover={{ textDecoration: "none" }}
          >
            <Cpu size={28} className="mr-2" />
            <Heading as="h1" size="md" fontWeight={700}>
              App name
            </Heading>
          </Link>
          <InputGroup maxW="300px" ml="80px">
            <InputLeftElement pointerEvents="none">
              <AiOutlineSearch color="#ac99e7" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Enter search prompt..."
              borderColor="#ac99e7"
              focusBorderColor="#37248f"
            />
          </InputGroup>
        </Flex>

        <HStack spacing={3} display="flex" alignItems="center">
          {" "}
          {/* Add margin-top here */}
          <Button
            variant="ghost"
            color="white"
            size="sm"
            onClick={() => router.push("/categories")}
            _hover={{ color: "brand.200" }}
          >
            Categories
          </Button>
          <Button
            variant="ghost"
            color="white"
            size="sm"
            onClick={() => router.push("/glossary")}
            _hover={{ color: "brand.200" }}
          >
            Glossary
          </Button>
          <Button
            variant="ghost"
            color="white"
            size="sm"
            onClick={() => router.push("/video-glossary")}
            _hover={{ color: "brand.200" }}
          >
            Video Glossary
          </Button>
          <Button
            variant="ghost"
            color="white"
            size="sm"
            onClick={() => router.push("/login")}
            _hover={{ color: "brand.200" }}
          >
            Log in
          </Button>
          <Button
            variant="outline"
            borderColor="brand.300"
            color="brand.300"
            size="sm"
            onClick={() => router.push("/sign-up")}
          >
            Sign up
          </Button>
          <Button
            variant="solid"
            color="brand.900"
            backgroundColor="brand.300"
            size="sm"
            onClick={() => router.push("/survey")}
          >
            Take Survey
          </Button>
        </HStack>
      </Container>
    </div>
  );
};
