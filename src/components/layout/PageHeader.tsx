import { Container, Flex, Heading } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  const router = useRouter();

  return (
    <div className="border-b border-gray-100 bg-white">
      <Container maxW="8xl" py={5}>
        <Flex gap={5} bg="white">
          <button
            className="bg-brand-50 hover:bg-brand-100 flex h-10 w-10 items-center justify-center rounded-full py-5"
            onClick={() => router.back()}
            type="button"
          >
            <ArrowLeft size={20} className="text-brand-500" />
          </button>
          <div className="space-y-1">
            <Heading as="h1" className="!text-2xl !leading-[1]" fontWeight={600}>
              {title}
            </Heading>
            <p className="text-[14px] !leading-tight text-gray-500">{subtitle}</p>
          </div>
        </Flex>
      </Container>
    </div>
  );
};
