import { Layout } from "@/components";
import { Link } from "@chakra-ui/next-js";
import { Button, Container, Heading, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    router.push(`/search?q=${data.search}`);
  };

  return (
    <Layout title="Home">
      <section className="relative mt-[-73px] flex h-[95vh] w-full flex-col items-center justify-center bg-[#04031b] bg-[url('/images/hero.png')] bg-cover">
        {/* <Heading as="h1" size="4xl" color="white" textAlign="center" pb={6} fontWeight={900}>
          Hello World
        </Heading> */}
        <Heading as="h1" size="3xl" color="white" textAlign="center" pb={6}>
          <TypeAnimation
            preRenderFirstString={true}
            sequence={[
              "We produce food for Mice",
              1000,
              "We produce food for Hamsters",
              1000,
              "We produce food for Guinea Pigs",
              1000,
              "We produce food for Chinchillas",
              1000
            ]}
            speed={50}
            repeat={Infinity}
          />
        </Heading>
        <img src="/images/hero-phone.png" alt="hero" className="mb-16 w-1/3 opacity-50" />
        <Text color="white" textAlign="center" fontSize="2xl" className="w-1/3 opacity-90">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore.
        </Text>
        <div className="mt-12 flex w-full max-w-screen-md items-center justify-center gap-4">
          <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                size="lg"
                h={16}
                type="text"
                borderRadius={8}
                color="white"
                className="!min-w-[400px] !rounded-[12px] !px-6 focus:border-gray-600 focus:outline-none focus:ring-0"
                placeholder="Search by any criteria"
                {...register("search")}
              />
            </form>
            {/* <Button
              ml={2}
              size="lg"
              variant={"outline"}
              h={16}
              px="10"
              // rightIcon={<SearchIcon size="20" className="mt-[-3px]" />}
              className="flex items-center !rounded-[12px] bg-white text-transparent"
            >
              Search
            </Button> */}
          </div>
          <div className="flex w-full items-center justify-center space-x-4">
            <hr className="border-1 w-1/4 bg-gray-600 opacity-50" />
            <span className="text-lg font-semibold text-gray-200">or</span>
            <hr className="border-1 w-1/4 bg-gray-600 opacity-50" />
          </div>
          <Link href="/survey">
            <Button
              colorScheme="brand"
              ml={2}
              size="lg"
              h={16}
              px="16"
              className="!rounded-[12px] uppercase"
            >
              Take guide
            </Button>
          </Link>
        </div>
      </section>
      <Container maxW="container.xl" py={6} as="main" minH="10vh">
        <section className="py-12">Categories</section>
        <section className="py-12">Popular releases</section>
      </Container>
    </Layout>
  );
}
