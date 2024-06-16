import { Layout } from "@/components";
import { PhoneOverview } from "@/components/smartphones/PhoneOverview";
import smartphonesData from "@/data/phones.json";
import { Phone } from "@/types";
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
      {/* <PhoneOverview phone1={data} />
      <PhoneOverview phone1={data} phone2={smartphonesData[1] as Phone} winnerId={1} /> */}
    </Layout>
  );
};

export default smartphonepage;
