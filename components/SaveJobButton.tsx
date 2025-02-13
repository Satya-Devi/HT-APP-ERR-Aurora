"use client";

import { saveJob } from "@/app/jobs/[id]/actions";
import { JobData } from "@/utils/interface";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBookmark } from "@tabler/icons-react";

type SaveJobButtonProps = {
  userId: string;
  job: JobData;
};

export default function SaveJobButton({ userId, job }: SaveJobButtonProps) {
  const handleSaveJob = () => {
    if (!userId || !job?.id) {
      notifications.show({
        title: "Error",
        message: "Missing required information to save job",
        color: "red",
      });
      return;
    }
  
    try {
      const jobData: JobData = {
        id: job.id,
        company_name: job.company_name || null,
        job_listing_source_url: job.job_listing_source_url || null,
        job_title: job.job_title || null,
        job_location: job.job_location || null,
        job_description: job.job_description || null,
        skills: job.skills || null,
        created_at: new Date().toISOString(),
        employer_logo: job.employer_logo || null,
        job_id: job.id,
      };
  
      saveJob(userId, jobData)
        .then((result: any) => {
          if (result?.error) {
            // If there's an error in the result, throw an error to be caught by .catch()
            throw new Error(result.error);
          }
          notifications.show({
            title: "Job saved!",
            message: "The job has been saved successfully!",
            color: "green",
          });
        })
        .catch((err) => {
          notifications.show({
            title: "Save failed",
            message: "Unable to save the job. Please try again later.",
            color: "red",
          });
        });
    } catch (err) {
      // This catch block handles any synchronous errors
      notifications.show({
        title: "Save failed",
        message: "Unable to save the job. Please try again later.",
        color: "red",
      });
    }
  };
  

  return (
    <Button
      fullWidth
      size="lg"
      bg="white"
      variant="outline"
      leftSection={
        <IconBookmark
          style={{
            color: "#489BE7",
            width: "15.16px",
            height: "18px",
            border: "1.89px",
          }}
        />
      }
      style={{
        width: "100%",
        height: "58px",
        padding: "16px 24px",
        borderRadius: "6px 0 0 0",
        border: "1px solid transparent",
        backgroundColor: "#fff",
        gap: "8px",
      }}
      fz="md"
      onClick={handleSaveJob}
    >
      Save Job
    </Button>
  );
}
