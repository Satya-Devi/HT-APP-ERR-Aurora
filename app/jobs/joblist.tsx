"use client";
import { Container, Group, Paper, Text, Title } from "@mantine/core";
import MobileFilter from "@/components/MobileFilter/MobileFilter";
import PaginatedSearch from "@/components/PaginatedSearch";
import Link from "next/link";
import { fetchJobs } from "../actions";
import { SFProRounded } from "../layout";
import { User } from "@supabase/supabase-js";
import JobCardSmall from "@/components/JobCardSmall/JobCardSmall";
import { useEffect, useState } from "react";
import { JobData } from "@/utils/interface";

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
  user: User | null;
};

export function JobList({
  searchParams,
  page,
  itemsPerPage,
  user,
}: JobListProps) {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        const result = await fetchJobs({
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

        if (result.error) {
          setError(result.error);
        } else {
          setJobs(result.jobs || []);
          setCount(result.count || 0);
        }
      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [searchParams, page, itemsPerPage]);

  if (error) {
    return (
      <Container px={0}>
        <Group justify="space-between">
          <div>
            <Text component="div" c="dimmed" size="lg" fw={500} ta="left">
              No jobs found for your search query.
            </Text>
          </div>
          <MobileFilter />
        </Group>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container px={0}>
        <Text>Loading jobs...</Text>
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

      {jobs?.length === 0 && (
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

      {jobs?.length > 0 && jobs?.map((job) => (
        <Container px={0} my="sm" key={job.id} className={SFProRounded.className}>
          <Link
            href={`/jobs/${job.id}`}
            style={{ textDecoration: "none" }}
            key={job.id}
          >
            <JobCardSmall userId={user?.id} job={job} key={job.id} />
          </Link>
        </Container>
      ))}

      <PaginatedSearch total={count || 0} itemsPerPage={itemsPerPage} />
    </>
  );
}
