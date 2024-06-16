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
          className={clsx("grid grid-cols-1 gap-16 md:grid-cols-1", {
            "!grid-cols-1": !Boolean(phone2)
          })}
        >
          <div>
            {Boolean(phone2) && (
              <h3 className="text-2xl font-semibold text-brand-700">{phone1.name}</h3>
            )}
            <PricesList priceTags={priceTags1} />
          </div>

          {phone2 && priceTags2 && (
            <div>
              <h3 className="text-2xl font-semibold text-brand-700">{phone2.name}</h3>
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
    <div className="mt-4 flex w-full flex-col overflow-y-auto rounded-xl border border-gray-200">
      {priceTags.map((priceTag) => (
        <a
          key={priceTag.name}
          href={priceTag.url}
          target="_blank"
          rel="noreferrer"
          className="not:first:border-t group flex w-full items-center justify-between gap-6 rounded-lg border-gray-200 bg-white p-6 first:rounded-tl-xl first:rounded-tr-xl last:rounded-bl-xl last:rounded-br-xl even:bg-gray-50"
        >
          <div className="flex items-center space-x-4">
            {!!priceTag.price && priceTag.price !== "null" && (
              <span className="rounded-md bg-brand-500 px-2 py-1 font-medium text-white">
                ${priceTag.price}
              </span>
            )}
            <h3 className="line-clamp-1 text-xl font-semibold group-hover:text-brand-500">
              {priceTag.name}
            </h3>
          </div>
          <div className="block h-fit">
            {priceTag.merchant === "ebay" && (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png"
                alt="ebay"
                className="h-6 object-contain"
              />
            )}
            {priceTag.merchant === "google_shopping" && (
              <img
                src="https://conversiongiant.com/wp-content/uploads/2022/01/google-shopping-logo.png"
                alt="google shopping"
                className="h-10 object-contain"
              />
            )}

            {priceTag.merchant === "amazon" && (
              <img
                src="https://images.crowdspring.com/blog/wp-content/uploads/2023/07/03162944/amazon-logo-1.png"
                alt="google shopping"
                className="mt-2 h-8 object-contain"
              />
            )}
          </div>
          {/* <p className="text-sm">{priceTag.merchant}</p> */}
        </a>
      ))}
    </div>
  );
};
