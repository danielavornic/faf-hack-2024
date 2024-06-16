import { useUpdateUrl } from "@/hooks";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Select } from "./Select";
import Sticky from "react-sticky-el";
import {
  Checkbox,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack
} from "@chakra-ui/react";

type FiltersFormData = {
  sortBy: string;
  priceMin: number;
  priceMax: number;
  batteryMin: number;
  batteryMax: number;
  displayType: string;
  storageMin: number;
  storageMax: number;
  brand: string[];
};

interface FilterOption {
  value: string;
  label: string;
}

const sortByOptions: FilterOption[] = [
  { value: "score", label: "Score" },
  { value: "price-low-to-high", label: "Price: Low to High" },
  { value: "price-high-to-low", label: "Price: High to Low" },
  { value: "user-rating", label: "User Rating" }
];

const SpecDropdown = ({ name }: { name: string }) => {
  return (
    <div className="flex cursor-pointer items-center rounded-lg border border-transparent px-2 py-2 hover:border-gray-200">
      <ChevronLeft className="text-brand-400 mr-2 h-4 w-4" />
      <p className="text-base font-medium">{name}</p>
    </div>
  );
};

export const FiltersCard = () => {
  const { register, handleSubmit, reset, watch, getValues, control, setValue } =
    useForm<FiltersFormData>({
      defaultValues: {
        sortBy: "score",
        priceMin: 0,
        priceMax: 3000,
        batteryMin: 0,
        batteryMax: 10000,
        displayType: "",
        storageMin: 0,
        storageMax: 10000
      }
    });

  const router = useRouter();

  // useEffect(() => {
  //   const queryParams = router.query;
  //   const formValues: { [key: string]: FilterOption | string | string[] | number } = {
  //     sortBy: queryParams.sortBy ? (queryParams.sortBy as string) : "score",
  //     priceMin: queryParams.priceMin ? parseInt(queryParams.priceMin as string) : 0,
  //     priceMax: queryParams.priceMax ? parseInt(queryParams.priceMax as string) : 10000,
  //     batteryMin: queryParams.batteryMin ? parseInt(queryParams.batteryMin as string) : 0,
  //     batteryMax: queryParams.batteryMax ? parseInt(queryParams.batteryMax as string) : 10000,
  //     displayType: queryParams.displayType ? (queryParams.displayType as string) : "",
  //     storageMin: queryParams.storageMin ? parseInt(queryParams.storageMin as string) : 0,
  //     storageMax: queryParams.storageMax ? parseInt(queryParams.storageMax as string) : 10000
  //   };

  //   reset(formValues);
  // }, [router.query, reset]);

  useUpdateUrl(watch, getValues);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Sticky>
      <div
        className="custom-scrollbar-light mt-4 w-[350px] rounded-[12px] border border-gray-300 bg-white p-2"
        ref={ref}
      >
        <form className="custom-scrollbar max-h-[calc(100vh-50px)] overflow-y-auto p-2 pr-4">
          <div className="py-2 pb-4">
            <p className="font-poppins mb-2 text-base font-semibold">Sort by</p>
            <Controller
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={sortByOptions}
                  placeholder="Select an option"
                  fullWidth
                />
              )}
              {...{
                ...register("sortBy"),
                ref: null
              }}
            />
          </div>
          <hr />
          <div className="space-y-2 py-4">
            <p className="font-poppins mb-2 text-base font-semibold">Price</p>
            <RangeSlider
              aria-label={["min", "max"]}
              colorScheme="brand"
              defaultValue={[0, 3000]}
              min={0}
              max={3000}
              onChangeEnd={(values) => {
                setValue("priceMin", values[0]);
                setValue("priceMax", values[1]);
              }}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <div className="flex justify-between">
              <p className="text-sm font-medium">${watch("priceMin")}</p>
              <p className="text-sm font-medium">${watch("priceMax")}</p>
            </div>
          </div>
          <hr />
          <div className="space-y-2 py-4">
            <p className="font-poppins mb-1 text-base font-semibold">Brand</p>
            <Input placeholder="Search brand" size="sm" rounded="lg" />
            <div className="flex flex-wrap gap-2">
              {["Apple", "Samsung", "Xiaomi", "OnePlus", "Google", "Realme"].map((brand, index) => (
                <Checkbox
                  key={index}
                  colorScheme="brand"
                  size="sm"
                  className="text-sm"
                  onChange={(e) =>
                    setValue(
                      "brand",
                      e.target.checked
                        ? [...(watch("brand") || []), brand]
                        : watch("brand").filter((b: string) => b !== brand)
                    )
                  }
                >
                  {brand}
                </Checkbox>
              ))}
              <p className="text-brand-500 cursor- pointer text-sm font-semibold">View more...</p>
            </div>
          </div>
          <hr />
          <div className="space-y-2 py-4">
            <p className="font-poppins mb-2 text-base font-semibold">Performance</p>
            <SpecDropdown name="RAM" />
            <SpecDropdown name="Processor model" />
            <SpecDropdown name="Processor speed" />
            <SpecDropdown name="Storage" />
            <SpecDropdown name="Geekbench 6 result" />
            <SpecDropdown name="Battery power" />
          </div>
          <hr />
          <hr />
          <div className="space-y-2 py-4">
            <p className="font-poppins mb-2 text-base font-semibold">Display</p>
            <SpecDropdown name="Screen size" />
            <SpecDropdown name="Display type" />
            <SpecDropdown name="Refresh rate" />
            <SpecDropdown name="Resolution" />
          </div>
          <div className="space-y-2 py-4">
            <p className="font-poppins mb-2 text-base font-semibold">Photo & Audio</p>
            <SpecDropdown name="Camera Megapixels" />
            <SpecDropdown name="Has audio jack" />
            <SpecDropdown name="Stereo speakers" />
          </div>
          <hr />
          <div className="space-y-2 pt-4">
            <p className="text-brand-500 cursor-pointer text-center font-semibold">View more...</p>
          </div>
        </form>
      </div>
    </Sticky>
  );
};
