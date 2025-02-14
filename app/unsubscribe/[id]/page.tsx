"use client";
import React, { useState, useEffect } from "react";
import { Button, Center, Card, Text, Loader, Container, Group, Badge } from "@mantine/core";
import { useRouter } from "next/navigation";
import { deleteJobAlert, getJobAlertId } from "@/components/JobAlerts/jobAlert";

type JobAlertProps = {
  params: { id: string };
};

const JobAlertPage = ({ params }: JobAlertProps) => {
  const { id } = params;
  const [jobAlertData, setJobAlertData] = useState<any | null>(null);
  const [message, setMessage] = useState<string>("Loading...");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchJobAlert = async () => {
    try {
      const response = await getJobAlertId(Number(id));
      setJobAlertData(response?.data);
      setMessage(""); // Clear the loading message
    } catch {
      setMessage("Error fetching job alert content");
    }
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    try {
         await deleteJobAlert(jobAlertData?.id);
        setMessage("You have successfully unsubscribed");
        router.push("/");

    } catch {
      setMessage("Error during unsubscribe process");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobAlert();
  }, [id]);

  return (
    <Container style={{padding:"50px 20px "}}>
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 800, margin: "0 auto" }}>
      <Text  size="xl"  mb="md">
        Job Alert
      </Text>
      {jobAlertData ? (
        <>
          <Center>
            <Text size="sm" >
              You are subscribed with <strong>{jobAlertData.email}</strong> for job alerts in the 
              <strong> {jobAlertData.job_category}</strong> category with a frequency of 
              <strong> {jobAlertData.frequency}</strong>. If you wish to unsubscribe, click the button below.
            </Text>
          </Center>
          <Center mt="md">
            <Button color="red" onClick={handleUnsubscribe} loading={loading} >
              Unsubscribe
            </Button>
          </Center>
        </>
      ) : (
        <Center>
          <Text size="sm" >
            {message || "We couldn't find any active job alerts associated with your account."}
          </Text>
        </Center>
      )}
      {message && !jobAlertData && (
        <Center mt="md">
          <Text size="sm" color={message.startsWith("Error") ? "red" : "green"} >
            {message}
          </Text>
        </Center>
      )}
    </Card>
  </Container>
  
  );
};

export default JobAlertPage;
