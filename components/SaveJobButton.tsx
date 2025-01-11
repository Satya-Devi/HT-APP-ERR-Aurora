"use client";

import { saveJob } from "@/app/jobs/[id]/actions";
import { JobData } from "@/utils/interface";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBookmark } from "@tabler/icons-react";
import { useState } from "react";

type SaveJobButtonProps = {
  userId: string;
  job: JobData;
};

export default function SaveJobButton({ userId, job }: SaveJobButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveJob = () => {
    setIsLoading(true);
    const jobData: JobData = {
      id: job.id,
      company_name: job.company_name,
      job_listing_source_url: job.job_listing_source_url,
      job_title: job.job_title,
      job_location: job.job_location,
      job_description: job.job_description,
      skills: job.skills,
      created_at: new Date().toISOString(),
      employer_logo: job.employer_logo,
      job_id: job.id,
    };

    saveJob(userId, jobData)
      .then(() => {
        notifications.show({
          title: "Job saved!",
          message: "The job has been saved successfully!",
          color: "green",
        });
      })
      .catch(() => {
        notifications.show({
          title: "Oops...",
          message: "Unable to save the job. Please try again later.",
          color: "red",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      fullWidth
      size="lg"
      bg="white"
      variant="outline"
      leftSection={<IconBookmark style={{ color: '#489BE7', width:"15.16px", height:"18px", border:"1.89px" }}/>}
      style={{
        width: '100%',     
        height: '58px',      
        padding: '16px 24px',
        borderRadius: '6px 0 0 0',
        border: '1px solid transparent',
        backgroundColor: '#fff',
        gap: "8px"
      }}
      fz="md"
      onClick={handleSaveJob}
      disabled={isLoading}
    >
      Save Job
    </Button>
  );
}
