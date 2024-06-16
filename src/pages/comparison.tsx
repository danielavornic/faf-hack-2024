import { Layout, PageHeader } from "@/components";
import { PhoneOverview } from "@/components/smartphones/PhoneOverview";
import { PhonePrices } from "@/components/smartphones/PhonePrices";
import { axios } from "@/lib/axios";
import { useComparison } from "@/lib/hooks";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const comparison = () => {
  const { phones } = useComparison();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["phones", phones],
    queryFn: async () => {
      const { data } = await axios.get(`/api/smartphones/${phones[0].id}/vs/${phones[1].id}`);
      return data;
    }
  });

  const { data: radarData1 } = useQuery({
    queryKey: ["graph", phones],
    queryFn: async () => {
      const { data } = await axios.get(`/api/smartphones/chart/${phones[0].id}/vs/${phones[1].id}`);
      return data;
    },
    select: (data) => {
      return {
        labels: data.labels,
        datasets: [
          {
            label: "Phone 1",
            data: data.dataset1.data,
            backgroundColor: "#502fb770",
            borderColor: "#502fb7",
            borderWidth: 1
          },
          {
            label: "Phone 2",
            data: data.dataset2.data,
            backgroundColor: "#DD6B2070",
            borderColor: "#DD6B20",
            borderWidth: 1
          }
        ]
      };
    }
  });

  // radarData2 is radarData1 with the labels and data swapped
  const radarData2 = radarData1
    ? {
        labels: radarData1.labels,
        datasets: [
          {
            label: "Phone 2",
            data: radarData1.datasets[1].data,
            backgroundColor: "#DD6B2070",
            borderColor: "#DD6B20",
            borderWidth: 1
          },
          {
            label: "Phone 1",
            data: radarData1.datasets[0].data,
            backgroundColor: "#502fb770",
            borderColor: "#502fb7",
            borderWidth: 1
          }
        ]
      }
    : null;

  console.log(data);

  return (
    <Layout title="Comparison" className="bg-[#fbfaff]">
      {isLoading || !data ? (
        <div className="flex items-center justify-center pt-[20vh]">
          <Spinner colorScheme="purple" size="xl" />
        </div>
      ) : isSuccess ? (
        <>
          <PhoneOverview
            phone1={data.smartphoneOne}
            phone2={data.smartphoneTwo}
            phone1Radar={radarData1}
            phone2Radar={radarData2}
            winnerId={data.winner}
          />
          <PhonePrices phone1={data.smartphoneOne} phone2={data.smartphoneTwo} />
        </>
      ) : (
        <>
          <PageHeader title="Comparison" subtitle="Compare phones here" />
          <p className="pt-20 text-center text-lg">No phones to compare</p>
        </>
      )}
    </Layout>
  );
};

export default comparison;
