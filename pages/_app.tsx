import ErrorBoundary from "@/components/ErrorBoundary";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Inter_Tight } from "next/font/google";
import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.css";

const inter = Inter_Tight({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <MantineProvider
        theme={{
          fontFamily: inter.style.fontFamily,
        }}
      >
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </ErrorBoundary>
  );
}
