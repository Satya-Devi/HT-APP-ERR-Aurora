
import { CardAICTA } from "@/components/CardAICTA/CardAICTA";
import { CardContentCTA } from "@/components/CardContentCTA/CardContentCTA";
import { Hero } from "@/components/Hero/Hero";
import SearchFilters from "@/components/SearchFilters";
import { Container, Grid, GridCol } from "@mantine/core";
import { JobList } from "./joblist";
import { createClient } from "@/utils/supabase/server";
import JobTabs from "@/components/JobTabs/JobTabs";
import SolutionAreaFilter from "@/components/SolutionAreaFilter/SolutionAreaFilter";
import { SFProRounded } from "../layout";
import classes from "./jobs.module.css";

// Create a client wrapper component to handle state
function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// Main page component remains a Server Component
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    location?: string;
    remote?: string;
    includeFulltime?: string;
    includeContractor?: string;
    speciality?: string;
    company?: string;
    page?: string;
    count?: string;
  };
}) {
  const page = parseInt(searchParams?.page || "1");
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const itemsPerPage =
    searchParams?.count && ["25", "50"].includes(searchParams.count)
      ? parseInt(searchParams.count)
      : 10;

  const searchParamsKey = Object.values(searchParams || {}).join("");

  return (
    <ClientWrapper>
      <Hero
        title="Stop the endless scroll of job searching"
        subtitle="Only relevent Microsoft Technology jobs here"
        align="center"
      />
      <Container
        size="xl"
        // className={${SFProRounded.className} ${classes.container}}
        mx={"auto"}
      >
        <SolutionAreaFilter />
        <JobTabs />
        <main>
          <Grid>
            <GridCol
              style={{ overflowY: "scroll" }}
              py={0}
              span={{ base: 12, md: 8 }}
            >
              <JobList
                user={user}
                searchParams={searchParams}
                page={page}
                itemsPerPage={itemsPerPage}
              />
            </GridCol>

            <GridCol mt={20} span={{ base: 12, md: 4 }}>
              <SearchFilters />
              <CardAICTA />
              <CardContentCTA />
            </GridCol>
          </Grid>
        </main>
      </Container>
    </ClientWrapper>
  );
}