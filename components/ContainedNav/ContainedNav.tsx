import { Container } from "@mantine/core";
import MainNav from "../Navbar/MainNav";
import { Navbar } from "../Navbar/Navbar";

export function ContainedNav() {
  return (
    <Container fluid>
      <MainNav >
        <Navbar />
      </MainNav>
    </Container>
  );
}
