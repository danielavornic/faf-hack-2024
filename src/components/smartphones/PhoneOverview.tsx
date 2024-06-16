import { useAppDispatch } from "@/lib/hooks";
import { Phone } from "@/types";
import { Link } from "@chakra-ui/next-js";
import {
  Container,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip
} from "@chakra-ui/react";
import clsx from "clsx";
import { Check, ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend);

const topLinks = [
  {
    name: "Overview",
    url: "#overview"
  },
  {
    name: "Display",
    url: "#display"
  },
  {
    name: "Performance",
    url: "#performance"
  },
  {
    name: "Camera",
    url: "#camera"
  },
  {
    name: "Price",
    url: "#price"
  }
];

export const data = {
  labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
  datasets: [
    {
      label: "Phone 1",
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(78, 99, 132, 1)",
      borderWidth: 1
    },
    {
      label: "Phone 2",
      data: [5, 6, 7, 5, 1, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1
    }
  ]
};

export const PhoneOverview = ({
  phone1,
  phone2,
  winnerId
}: {
  phone1: Phone;
  phone2?: Phone;
  winnerId?: number;
}) => {
  const router = useRouter();
  const [hash, setHash] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    // use window location hash to determine which section to highlight
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    setHash(window.location.hash);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="border-b border-gray-200 bg-white">
        <Container maxW="8xl">
          <div className="flex items-center justify-between">
            <div className="flex">
              {topLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className={clsx("hover:bg-brand-200 px-4 py-2 hover:text-white", {
                    "bg-brand-200 text-white": hash === link.url,
                    "text-gray-700": hash !== link.url
                  })}
                >
                  {link.name}
                </a>
              ))}
            </div>
            {!phone2 && (
              <button
                className="bg-brand-500 flex items-center gap-2 px-4 py-2 text-white"
                onClick={() => router.back()}
              >
                <Plus size={16} className="mr-2" />
                <span>Add to comparison</span>
              </button>
            )}
          </div>
        </Container>
      </div>

      <Container maxW="8xl" py={10}>
        <div className="flex items-center justify-center">
          <div className="space-y-2">
            <div className="-ml-16 flex items-center gap-4">
              <Tooltip label="Score" aria-label="Score" placement="left">
                <div className="h-12 w-12">
                  <CircularProgressbar
                    value={phone1.score}
                    text={`${phone1.score}%`}
                    background
                    strokeWidth={8}
                    classes={{
                      root: "align-middle",
                      text: clsx(
                        "text-[24px] fill-brand-700 font-bold l-1 text-anchor-middle dominant-baseline-middle"
                      ),
                      background: clsx("opacity-10 fill-brand-700"),
                      trail: "bg-transparent",
                      path: clsx("stroke-brand-700")
                    }}
                  />
                </div>
              </Tooltip>
              <Link href={`/smartphones/${phone1.id}`}>
                <h2 className="font-poppins text-2xl font-semibold">{phone1.name}</h2>
              </Link>
            </div>

            <div className="pt-4">
              <div className="relative flex">
                <img src={phone1.imageUrl} alt={phone1.name} className="h-[500px]" />
                <div className="bg-phone absolute bottom-0 h-[30%] w-full"></div>
                <div className="text-brand-500 border-brand-500 absolute -right-16 bottom-0 rounded-[100px] border-2 bg-white bg-opacity-65 px-8 py-3 text-2xl font-medium italic backdrop-blur-md">
                  $ {phone1.avgPrice}
                </div>
              </div>
            </div>
          </div>
          {phone2 && (
            <>
              {/*  vertical line with vs written */}
              {/* <div className="mx-[100px] h-[500px] w-0.5 bg-gray-200"></div> */}
              <div className="font-poppins mx-[120px] text-3xl font-medium text-gray-400 opacity-90">
                vs
              </div>
              <div className="space-y-2">
                <div className="-ml-16 flex items-center gap-4">
                  <Tooltip label="Score" aria-label="Score" placement="left">
                    <div className="h-12 w-12">
                      <CircularProgressbar
                        value={phone2.score}
                        text={`${phone2.score}%`}
                        background
                        strokeWidth={8}
                        classes={{
                          root: "align-middle",
                          text: clsx(
                            "text-[24px] fill-brand-700 font-bold l-1 text-anchor-middle dominant-baseline-middle"
                          ),
                          background: clsx("opacity-10 fill-brand-700"),
                          trail: "bg-transparent",
                          path: clsx("stroke-brand-700")
                        }}
                      />
                    </div>
                  </Tooltip>
                  <Link href={`/smartphones/${phone2.id}`}>
                    <h2 className="font-poppins text-2xl font-semibold">{phone2.name}</h2>
                  </Link>
                </div>

                <div className="pt-4">
                  <div className="relative flex">
                    <img src={phone2.imageUrl} alt={phone2.name} className="h-[500px]" />
                    <div className="bg-phone absolute bottom-0 h-[30%] w-full"></div>
                    <div className="text-brand-500 border-brand-500 absolute -right-16 bottom-0 rounded-[100px] border-2 bg-white bg-opacity-65 px-8 py-3 text-2xl font-medium italic backdrop-blur-md">
                      $ {phone2.avgPrice}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <section>
          <h1 className="font-poppins mt-16 text-center text-4xl font-semibold">
            {/* {phone1.name} specs & review */}
            {phone2 ? `${phone1.name} vs ${phone2.name}` : `${phone1.name} specs & review`}
          </h1>
          <ChevronDown size={36} className="mx-auto mt-4" />
        </section>
      </Container>
      <section id="overview" className="border-t border-gray-200 bg-white py-8">
        <Container maxW="8xl">
          <Tabs colorScheme="brand">
            <TabList>
              <Tab className="font-poppins !text-lg !font-medium">{phone1.name}</Tab>
              {phone2 && <Tab className="font-poppins !text-lg !font-medium">{phone2.name}</Tab>}
            </TabList>

            <TabPanels>
              <PhoneTab phone={phone1} otherPhone={phone2} />
              {phone2 && <PhoneTab phone={phone2} otherPhone={phone1} />}
            </TabPanels>
          </Tabs>
        </Container>
      </section>
    </div>
  );
};

const PhoneTab = ({ phone, otherPhone }: { phone: Phone; otherPhone?: Phone }) => {
  return (
    <TabPanel>
      <div className="flex py-4">
        <div className="w-1/2">
          <div className="pl-12 pr-20">
            <Radar data={data} />
          </div>
        </div>{" "}
        <div className="w-1/2">
          <h3 className="font-poppins text-xl font-semibold">
            {otherPhone ? (
              <>
                Why is {phone.name} better than {otherPhone.name}?
              </>
            ) : (
              <>Why is {phone.name} better than the average smartphone?</>
            )}
          </h3>

          <div className="mt-5 space-y-4">
            {phone.overview.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                {/* <div className="bg-brand-500 flex h-12 w-12 items-center justify-center rounded-[100px] text-white"> */}
                <Check size={24} className="text-brand-500" />
                {/* </div> */}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{item.title}</h4>
                    <Popover placement="right-start">
                      <PopoverTrigger>
                        <div className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-[12px] text-white">
                          ?
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>{item.title}</PopoverHeader>
                        <PopoverBody>
                          {item.description}
                          <Link
                            href={`/glossary/${item.title}`}
                            className="text-brand-500 mt-2 block font-semibold underline"
                          >
                            Learn more
                          </Link>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p className="mt-1 text-gray-500">
                    <b>{`${item.value} ${item.unit ? item.unit : ""} `}</b>
                    {`vs ${item.other} ${item.unit ? item.unit : ""}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TabPanel>
  );
};
