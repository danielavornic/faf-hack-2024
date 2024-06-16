import { Layout, PageHeader } from "@/components";
import { PhoneOverview } from "@/components/smartphones/PhoneOverview";
import { PhonePrices } from "@/components/smartphones/PhonePrices";
import { useComparison } from "@/lib/hooks";

const comparison = () => {
  const { phones } = useComparison();

  return (
    <Layout title="Comparison" className="bg-[#fbfaff]">
      {phones?.length > 0 ? (
        <>
          <PhoneOverview phone1={phones[0]} phone2={phones[1]} winnerId={1} />
          <PhonePrices phone1={phones[0]} phone2={phones[1]} />
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
