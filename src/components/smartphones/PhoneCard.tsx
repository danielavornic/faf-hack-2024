import React from "react";
import Link from "next/link";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Phone } from "@/types";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import clsx from "clsx";
import { Scale } from "lucide-react";
import { useAppDispatch, useComparison } from "@/lib/hooks";
import { removePhone, togglePhone } from "@/lib/slices/comparisonSlice";
import toast from "react-hot-toast";

const PhoneCard = ({ phone }: { phone: Phone }) => {
  const { id, name, avgPrice, imageUrl, score } = phone;
  const dispatch = useAppDispatch();

  const { phones } = useComparison();
  const isInComparison = phones.some((p) => p.id === id);

  return (
    <Link href={`/smartphones/${id}`} className="relative flex w-full">
      <div className="absolute left-4 top-[10px] z-10 h-12 w-12" style={{ marginTop: "10px" }}>
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          background
          strokeWidth={8}
          className="score-circle"
          classes={{
            root: "align-middle",
            text: clsx(
              "text-[24px] fill-brand-700 font-bold l-1 text-anchor-middle dominant-baseline-middle"
            ),
            background: clsx("fill-brand-100"),
            trail: "bg-transparent",
            path: clsx("stroke-brand-700")
          }}
        />
      </div>
      <Box
        // bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e"
        }}
        p={4}
        w="full"
        position="relative" // Ensure the box is relative to position the progress bar
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition="all 0.3s"
        _hover={{
          transform: "translateY(-2px)"
        }}
        rounded="12px"
        className="border border-gray-200 bg-white"
      >
        <div
          className="bg-phone mb-4 h-[250px] w-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>

        <Flex pt="4" pb="3" className="items-end justify-between border-t border-gray-100">
          <div>
            <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={2}>
              {name}
            </Text>

            <Text color="brand.700" fontStyle="italic" width="70px">
              ${avgPrice.toFixed(2)}
            </Text>
          </div>
          <Button
            className="bg-brand-500 !h-10 !w-10 !text-white"
            variant="ghost"
            size="sm"
            _hover={{ color: "brand.400" }}
            onClick={(e) => {
              e.preventDefault();
              // if (phones.length >= 2) {
              //   toast.error("You can only compare up to 2 phones");
              //   return;
              // }

              if (isInComparison) {
                dispatch(removePhone(phone.id));
                toast.success(`${phone.name} removed from comparison`);
              } else {
                dispatch(togglePhone(phone));
                toast.success(`${phone.name} added to comparison`);
              }
            }}
          >
            <Scale size={24} />
          </Button>
        </Flex>
      </Box>
    </Link>
  );
};

export default PhoneCard;
