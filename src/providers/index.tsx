import { MantineProvider } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider withGlobalStyles>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </MantineProvider>
  );
};

export default Providers;
