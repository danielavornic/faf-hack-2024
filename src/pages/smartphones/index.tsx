import { FiltersCard, Layout, PageHeader } from "@/components";
import { Button, Container, Flex } from "@chakra-ui/react";
import smartphonesData from "@/data/phones.json";
import { PhoneCard } from "@/components/smartphones/PhoneCard";

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
  return (
    <Layout title="Smartphones" className="bg-[#fbfaff]">
      <PageHeader title="Smartphones" subtitle="Browse the latest smartphones in the market." />
      <Container maxW="8xl" className="min-h-[200vh]">
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
          <FiltersCard />
          <div className="mt-4 w-full flex-1">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <PhoneCard phone={smartphonesData[0]} />
              {/* {phones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
              ))} */}
            </div>
          </div>
        </Flex>
      </Container>
    </Layout>
  );
};

export default smartphones;
