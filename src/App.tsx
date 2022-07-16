import Providers from "@/providers";
import Songs from "@/pages/songs";
import { Container } from "@mantine/core";

export default function App() {
  return (
    <Providers>
      <Container>
        <Songs />
      </Container>
    </Providers>
  );
}
