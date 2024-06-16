import { Layout, Navbar } from "@/components";
import { Button, Container, Heading, Input, Text, Flex, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TypeAnimation } from "react-type-animation";
import CategoryCard from "@/components/CategoryCard";
import { Flame, LaptopMinimal, MonitorSmartphone } from "lucide-react";
import { Grid, GridItem } from "@chakra-ui/react";

const categories = [
  {
    title: "Laptops",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1536846670933-ce6eef8dfe89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Computers & Accessories",
    image:
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Photo & Video",
    image:
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Audio",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    router.push(`/smartphones?prompt=${data.search}`);
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
              "Best picks for a new phone",
              1000,
              "Best picks for a new laptop",
              1000,
              "Best picks for a new computer",
              1000,
              "Best picks for a new camera",
              1000
            ]}
            speed={30}
            repeat={Infinity}
          />
        </Heading>
        <img src="/images/hero-phone.png" alt="hero" className="mb-16 w-1/3 opacity-50" />
        <Text color="white" textAlign="center" fontSize="2xl" className="w-1/3 opacity-90">
          Use any search prompt or take our survey to get personalized recommendations.
        </Text>
        <div className="mt-20 flex w-full max-w-screen-md items-center justify-center gap-4">
          <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                size="lg"
                h={16}
                type="text"
                borderRadius={8}
                color="white"
                className="!min-w-[400px] !rounded-[12px] !px-6 focus:border-gray-600 focus:outline-none focus:ring-0"
                placeholder="Enter search prompt..."
                {...register("search")}
              />
            </form>
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
              Take survey
            </Button>
          </Link>
        </div>
      </section>
      <Container maxW="container.xl" py={6} as="main" minH="10vh">
        <section className="py-12">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MonitorSmartphone
              className="text-brand-500"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <Heading as="h2" mb={6} mt={2} fontWeight={600} textAlign="center" color="brand.900">
            Categories
          </Heading>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {categories.map((category) => (
              <GridItem key={category.title}>
                <CategoryCard
                  title={category.title}
                  image={category.image}
                  category={category.title.toLowerCase()}
                />
              </GridItem>
            ))}
          </Grid>
        </section>
        {/* <section id="popular-releases" className="py-12">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Flame style={{ width: "50px", height: "50px", color: "#04031b" }} />
          </div>
          <Heading as="h2" mb={6} textAlign="center" color="brand.900">
            Popular releases
          </Heading>
        </section> */}
      </Container>
    </Layout>
  );
}
