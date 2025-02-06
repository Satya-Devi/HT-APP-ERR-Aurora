// "use client"
import { Container, Group, Paper, Text, Title } from "@mantine/core";
import MobileFilter from "@/components/MobileFilter/MobileFilter";
import PaginatedSearch from "@/components/PaginatedSearch";
import Link from "next/link";
import { fetchJobs } from "../actions";
import { SFProRounded } from "../layout";
import { User } from "@supabase/supabase-js";
import JobCardSmall from "@/components/JobCardSmall/JobCardSmall";
// import { useRouter } from 'next/navigation'

type JobListProps = {
  searchParams?: {
    query?: string;
    location?: string;
    company?: string;
    remote?: string;
    includeFulltime?: string;
    includeContractor?: string;
    speciality?: string;
    page?: string;
    tab?: string;
    filter?: string;
  };
  page: number;
  itemsPerPage: number;
  user:User|null
};

export async function JobList({
  searchParams,
  page,
  itemsPerPage,
  user,
}: JobListProps) {
  try {
    const { jobs, error, count } = await fetchJobs({
      query: searchParams?.query || "",
      location: searchParams?.location || "",
      company: searchParams?.company || "",
      remote: searchParams?.remote || "",
      includeFulltime: searchParams?.includeFulltime || "",
      includeContractor: searchParams?.includeContractor || "",
      speciality: searchParams?.speciality || "",
      page,
      itemsPerPage,
      tab: searchParams?.tab || "hot-jobs",
      filter: searchParams?.filter || "",
    });

    if (error) {
      return (
        <Container px={0}>
          <Group justify="space-between">
            <Text component="div" c="dimmed" size="lg" fw={500} ta="left">
              No jobs found for your search query.
            </Text>
            <MobileFilter />
          </Group>
        </Container>
      );
    }

    return (
      <>
        <Container px={0} className={SFProRounded.className}>
          <Group justify="space-between">
            <MobileFilter />
          </Group>
        </Container>

        {(!jobs || jobs.length === 0) && (
          <Container fluid my="xs" className={SFProRounded.className}>
            <Paper p={30} mt={30} radius="md">
              <Title ta="center" order={3} className={SFProRounded.className}>
                No data found
              </Title>
              <Text c="dimmed" size="lg" ta="center" mt={5} className={SFProRounded.className}>
                No jobs found for your search query.
              </Text>
            </Paper>
          </Container>
        )}

        {jobs?.map((job) => (
          <Container px={0} my="sm" key={job.id} className={SFProRounded.className}>
            <Link
              href={`/jobs/${job.id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <JobCardSmall userId={user?.id} job={job} />
            </Link>
          </Container>
        ))}

        <PaginatedSearch total={count || 0} itemsPerPage={itemsPerPage} />
      </>
    );
  } catch (err) {
    return (
      <Container px={0}>
        <Text>Error loading jobs. Please try again later.</Text>
      </Container>
    );
  }
}
