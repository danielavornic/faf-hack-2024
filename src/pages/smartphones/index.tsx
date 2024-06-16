import { FiltersCard, Layout, PageHeader } from "@/components";
import { Button, Container, Flex, Spinner } from "@chakra-ui/react";
import smartphonesData from "@/data/phones.json";
import PhoneCard from "@/components/smartphones/PhoneCard";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { axios } from "@/lib/axios";
import { useState } from "react";
import clsx from "clsx";

const tags = [
  "Top 10",
  "Best Sellers",
  "Budget",
  "Flagship",
  "Mid-Range",
  "Biggest Battery",
  "Best Camera",
  "Compact",
  "5G",
  "Foldable",
  "Waterproof"
];

const smartphones = () => {
  const router = useRouter();
  const { prompt, brand, priceMax, priceMin } = router.query;

  const { data, isLoading } = useQuery({
    queryKey: ["prompt", prompt, priceMax, priceMin],
    queryFn: async () => {
      const queryParams = queryString.stringify({ prompt, priceMax, priceMin });
      const { data } = await axios.get(`/api/smartphones?${queryParams}`);
      return data;
    }
  });

  // const { data: parameterData, isLoading: parameterLoading } = useQuery({
  //   queryKey: ["parameters", brand, priceMax],
  //   queryFn: async () => {
  //     const queryParams = queryString.stringify({ brand, priceMax });
  //     const { data } = await axios.get(`/api/smartphones/${queryParams}`);
  //     return data;
  //   }
  // });

  const [isSticky, setIsSticky] = useState(false);

  return (
    <Layout title="Smartphones" className="bg-[#fbfaff]">
      <PageHeader title="Smartphones" subtitle="Browse the most suitable smartphones for you" />
      <Container maxW="8xl" className="min-h-[105vh]">
        <Flex gap={3} mt={4} maxW="70%" flexWrap="wrap">
          {tags.map((tag) => (
            <Button
              _hover={{ background: "#ccc1f4" }}
              color="brand.700"
              // backgroundColor={selectedLetter === letter ? "#ccc1f4" : "gray.100"}
              key={tag}
              size="sm"
              variant="outline"
              className="!rounded-[100px] bg-white !px-5 py-2 !font-medium"
            >
              #{tag}
            </Button>
          ))}
        </Flex>

        <Flex mt={8} flexWrap="wrap" gap={4}>
          <FiltersCard isSticky={isSticky} setIsSticky={setIsSticky} />
          <div className="mt-4 w-full flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center pt-[20vh]">
                <Spinner colorScheme="purple" size="xl" />
              </div>
            ) : (
              <div
                className={clsx("grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", {
                  "ml-[350px]": isSticky
                })}
                id="phones"
              >
                {/* <PhoneCard phone={smartphonesData[0]} /> */}
                {data?.length &&
                  data.map((phone: any) => <PhoneCard key={phone.id} phone={phone} />)}
              </div>
            )}
          </div>
        </Flex>
      </Container>
    </Layout>
  );
};

export default smartphones;
