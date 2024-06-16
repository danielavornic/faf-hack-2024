import { Layout } from "@/components";
import { PhoneOverview } from "@/components/smartphones/PhoneOverview";
import { PhonePrices } from "@/components/smartphones/PhonePrices";
import smartphonesData from "@/data/phones.json";
import { Phone } from "@/types";
import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";

const data = smartphonesData[0] as Phone;

const smartphonepage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title={data.name} className="bg-[#fbfaff]">
      {id === "1" ? (
        <PhoneOverview phone1={data} phone2={smartphonesData[1] as Phone} winnerId={1} />
      ) : (
        <PhoneOverview phone1={data} />
      )}
      <PhonePrices phone1={data} phone2={smartphonesData[1] as Phone} />
      {/* <PhoneOverview phone1={data} />
      <PhoneOverview phone1={data} phone2={smartphonesData[1] as Phone} winnerId={1} /> */}
      <section className="border-t border-gray-200 bg-white py-16">
        <Container maxWidth="8xl">
          <h2 className="font-poppins text-4xl font-semibold">Performance</h2>
        </Container>
      </section>
    </Layout>
  );
};

export default smartphonepage;
