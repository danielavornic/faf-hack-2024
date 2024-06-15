import { Container, Flex, Heading } from "@chakra-ui/react";
import { Cpu } from "lucide-react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Link } from "@chakra-ui/next-js";

export const Navbar = () => {
  const router = useRouter();
  const isHoe = router.pathname === "/";
  return (
    <div
      className={clsx("relative z-[1] w-full border-b border-opacity-30 text-white", {
        "bg-brand-900": !isHoe,
        "border-white": isHoe
      })}
    >
      <Container maxW="8xl" py={6} className="flex items-center justify-between py-2">
        <Link
          href="/"
          display="flex"
          alignItems="center"
          className="hover:opacity-80"
          _hover={{ textDecoration: "none" }}
        >
          <Cpu size={24} className="mr-2" />
          <Heading as="h1" size="md" fontWeight={700}>
            App name
          </Heading>
        </Link>
      </Container>
    </div>
  );
};
