import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect } from "react";

interface FilterOption {
  label: string;
  value: string;
}

export const useUpdateUrl = (watch: any, getValues: any) => {
  const router = useRouter();

  const debouncedUpdateUrl = debounce(() => {
    const formFields = getValues();
    const newQuery: { [key: string]: string | string[] } = {
      // If id is present in the query, keep it (e.g. in TruckListSidebar)
      id: router.query.id as string
    };

    Object.keys(formFields).forEach((key) => {
      const formField = formFields[key as keyof FormData];

      if (Array.isArray(formField)) {
        newQuery[key] = formField; // Store the array directly
      } else {
        newQuery[key] =
          typeof formField === "object" && formField !== null
            ? (formField as FilterOption)?.value
            : formField;
      }
    });

    Object.keys(newQuery).forEach((key) => {
      if (newQuery[key] === "" || newQuery[key]?.length === 0) {
        delete newQuery[key];
      }
    });

    const search = queryString.stringify(newQuery, { arrayFormat: "comma" });
    if (window.location.search !== `?${search}`) {
      router.replace({ pathname: router.pathname, search }, undefined, { shallow: true });
    }
  }, 500);

  useEffect(() => {
    const subscription = watch(() => debouncedUpdateUrl());
    return () => subscription.unsubscribe();
  }, [watch, debouncedUpdateUrl]);
};
