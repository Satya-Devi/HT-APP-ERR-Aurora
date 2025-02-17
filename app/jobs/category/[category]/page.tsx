import { CardAICTA } from "@/components/CardAICTA/CardAICTA";
import { CardContentCTA } from "@/components/CardContentCTA/CardContentCTA";
import { Hero } from "@/components/Hero/Hero";
import SearchFilters from "@/components/SearchFilters";
import { Container, Grid, GridCol } from "@mantine/core";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import JobTabs from "@/components/JobTabs/JobTabs";
import SolutionAreaFilter from "@/components/SolutionAreaFilter/SolutionAreaFilter";
import classes from "../../jobs.module.css";
import { SFProRounded } from "@/app/layout";
import { JobList } from "../../joblist";
import Head from "next/head";
const categories=["data-engineer","data-scientist","software-developer","ai-engineer","app-developer","bi-analyst","data-architect","network-administrator","power-bi-developer","systems-administrator"]
export default async function Page({
  searchParams,
  params
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
  params?: {
    category?: string; 
  };
}) {
  console.log(params,"params");
  if(!params?.category || !categories.includes(params.category)) return <div>Category not found! </div>
  const page = parseInt(searchParams?.page || "1");
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let itemsPerPage = 10;

  if (searchParams?.count && ["25", "50"].includes(searchParams?.count)) {
    itemsPerPage = parseInt(searchParams?.count);
  }
  const searchParamsKey =
    searchParams?.query ||
    "" + searchParams?.location ||
    "" + searchParams?.remote ||
    "" + searchParams?.includeFulltime + searchParams?.includeContractor ||
    "" + searchParams?.speciality ||
    "" + searchParams?.company ||
    "";

  return (
    <>
     
      <Hero
        title={`${params?.category
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (char: string) => char.toUpperCase())} Jobs`}
        subtitle=""
        align="center"
        // backButtonStyles={{ marginLeft: "20px" }}
      />
      <Container
        size="xl"
        className={`${SFProRounded.className} ${classes.container}`}
        mx={"auto"}
      >
        {/* <SolutionAreaFilter /> */}
        <JobTabs />
        <main>
          <Grid>
            <GridCol
              style={{ overflowY: "scroll" }}
              py={0}
              span={{ base: 12, md: 8 }}
            >
              <Suspense
                fallback={<span>Loading...</span>}
                key={searchParamsKey}
              >
                <JobList
                  user={user}
                  searchParams={searchParams}
                  page={page}
                  itemsPerPage={itemsPerPage}
                  params={params}
                />
              </Suspense>
            </GridCol>

            <GridCol mt={20} span={{ base: 12, md: 4 }}>
              {/* <SearchFilters /> */}
              <CardAICTA />
              <CardContentCTA />
            </GridCol>
          </Grid>
        </main>
      </Container>
    </>
  );
}
