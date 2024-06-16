import { Layout } from "@/components";
import { PhoneOverview } from "@/components/smartphones/PhoneOverview";
import { PhonePrices } from "@/components/smartphones/PhonePrices";
import smartphonesData from "@/data/phones.json";
import { axios } from "@/lib/axios";
import { Phone } from "@/types";
import { Container, Spinner } from "@chakra-ui/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

// const data = smartphonesData[0] as Phone;

const smartphonepage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useQuery({
    queryKey: ["smartphone", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/smartphones/${id}`);
      return data;
    }
  });

  const { data: radarData, isLoading: isRadarLoading } = useQuery({
    queryKey: ["graph", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/smartphones/chart/${id}`);
      return data;
    },
    select: (data) => {
      return {
        labels: data.labels,
        datasets: [
          {
            label: "Phone 1",
            data: data.dataset.data,
            backgroundColor: "#502fb770",
            borderColor: "#502fb7",
            borderWidth: 1
          }
          // {
          //   label: "Phone 2",
          //   data: data.dataset2.data,
          //   backgroundColor: "#DD6B2020",
          //   borderColor: "#DD6B20",
          //   borderWidth: 1
          // }
        ]
      };
    }
  });

  return (
    <Layout title={isLoading ? "Phone" : data?.name} className="bg-[#fbfaff]">
      {isLoading || isRadarLoading ? (
        <div className="flex items-center justify-center pt-[20vh]">
          <Spinner colorScheme="purple" size="xl" />
        </div>
      ) : (
        <>
          <PhoneOverview phone1={data} phone1Radar={radarData} />
          <PhonePrices phone1={data} />
          <section className="border-t border-gray-200 bg-white py-16">
            <Container maxWidth="8xl">
              <h2 className="font-poppins text-4xl font-semibold">Performance</h2>
            </Container>
          </section>
        </>
      )}
    </Layout>
  );
};

export default smartphonepage;
