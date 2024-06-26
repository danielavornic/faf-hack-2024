import "@/styles/globals.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@fontsource/merriweather";
import "@fontsource-variable/roboto-slab";
import "@fontsource/poppins";
import { useRef } from "react";
import { AppStore, makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import ComparisonInitializer from "@/components/ComparisonInitializer";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const theme = extendTheme({
  colors: {
    brand: {
      50: "#edeaff",
      100: "#ccc1f4",
      200: "#ac99e7",
      300: "#8d71dc",
      400: "#7248d0",
      500: "#502fb7",
      600: "#37248f",
      700: "#211968",
      800: "#110f40",
      900: "#04031b"
    }
  },
  fonts: {
    heading: `'Poppins', serif`,
    body: `'Inter', sans-serif`
  }
});

export default function App({ Component, pageProps }: AppProps) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ChakraProvider theme={theme}>
        <ComparisonInitializer>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ComparisonInitializer>
        <Toaster position="top-left" />
      </ChakraProvider>
    </Provider>
  );
}
