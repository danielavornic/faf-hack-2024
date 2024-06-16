import React from "react";
import Link from "next/link";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { Phone } from "@/types";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import clsx from "clsx";
import { Scale } from "lucide-react";

const PhoneCard = ({ phone }: { phone: Phone }) => {
  const { id, name, avgPrice, imageUrl, score } = phone;

  return (
    <Link href={`/smartphones/${id}`} className="relative">
      <div className="left-200 absolute top-[-10px] z-10 h-12 w-12" style={{ marginTop: "10px" }}>
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
        bg="#edf3f8"
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
        rounded="lg"
        height="400px"
        width="220px"
      >
        <Image height="250px" src={imageUrl} alt={name} roundedTop="lg" />

        <Box p="4">
          <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={2}>
            {name}
          </Text>

          <Box mt="2">
            <Text color="brand.700" fontStyle="italic" width="70px">
              ${avgPrice.toFixed(2)}
            </Text>
            <Button
              ml="2px"
              variant="ghost"
              color="brand.700"
              size="sm"
              _hover={{ color: "brand.400" }}
            >
              <Scale size={24} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default PhoneCard;
