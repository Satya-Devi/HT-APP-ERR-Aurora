"use client";

import { unsaveJob } from "@/app/jobs/[id]/actions";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import classes from "./UnsaveJobButton.module.css";
import React, { useState } from "react";

type UnsaveJobButtonProps = {
  userId: string;
  jobId: string;
  onUnsave: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function UnsaveJobButton({
  userId,
  jobId,
  onUnsave,
}: UnsaveJobButtonProps) {
  const [isUnsaving, setIsUnsaving] = useState(false);
  
  const handleUnsaveJob = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsUnsaving(true);

    unsaveJob(userId, jobId)
      .then(() => {
        notifications.show({
          title: "Job removed.",
          message: "The job is no longer being tracked to your saved jobs.",
          color: "green",
        });
        onUnsave(event);
      })
      .catch(() => {
        notifications.show({
          title: "Oops...",
          message: "Unable to remove the job. Please try again later.",
          color: "red",
        });
      })
      .finally(() => {
        setIsUnsaving(false);
      });
  };

  return (
    <Button
      disabled={jobId === "" || isUnsaving}
      variant="default"
      radius="md"
      p={0} 
      mih={30} 
      h={30} 
      w={30}
      ml={8}
      onClick={handleUnsaveJob}
      style={{cursor: 'pointer'}}
    >
      <IconTrash className={classes.delete} stroke={1.5} />
    </Button>
  );
}
