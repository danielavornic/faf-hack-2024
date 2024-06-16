import { Phone } from "@/types";
import React from "react";
import Link from "next/link";

export const PhoneCard = ({ phone }: { phone: Phone }) => {
  const { name, avgPrice, imageUrl, score, performance } = phone;

  return <Link href={`/smartphones/${phone.id}`}>PhoneCard</Link>;
};
