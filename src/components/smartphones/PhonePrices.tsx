import { Phone } from "@/types";
import { Container } from "@chakra-ui/react";
import clsx from "clsx";

export const PhonePrices = ({ phone1, phone2 }: { phone1: Phone; phone2?: Phone }) => {
  const { priceTags: priceTags1 } = phone1;
  const { priceTags: priceTags2 } = phone2 || {};

  return (
    <section className="border-t border-t-gray-200 py-16" id="prices">
      <Container maxWidth="8xl">
        <h2 className="font-poppins mb-8 text-4xl font-semibold">Prices</h2>

        <div
          className={clsx("grid grid-cols-1 gap-16 md:grid-cols-2", {
            "!grid-cols-1": !Boolean(phone2)
          })}
        >
          <div>
            {Boolean(phone2) && (
              <h3 className="text-brand-700 text-2xl font-semibold">{phone1.name}</h3>
            )}
            <PricesList priceTags={priceTags1} />
          </div>

          {phone2 && (
            <div>
              <h3 className="text-brand-700 text-2xl font-semibold">{phone2.name}</h3>
              <PricesList priceTags={priceTags2} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

const PricesList = ({ priceTags }: { priceTags: Phone["priceTags"] }) => {
  return (
    <div className="mt-4 flex max-h-[370px] w-full flex-col overflow-y-auto rounded-xl border border-gray-200">
      {priceTags.map((priceTag) => (
        <a
          key={priceTag.name}
          href={priceTag.url}
          target="_blank"
          rel="noreferrer"
          className="not:first:border-t group flex w-full justify-between gap-4 rounded-lg border-gray-200 bg-white p-6 first:rounded-tl-xl first:rounded-tr-xl last:rounded-bl-xl last:rounded-br-xl even:bg-gray-50"
        >
          <h3 className="group-hover:text-brand-500 line-clamp-1 text-xl font-semibold">
            {priceTag.name}
          </h3>
          <p className="text-sm">{priceTag.merchant}</p>
        </a>
      ))}
    </div>
  );
};
