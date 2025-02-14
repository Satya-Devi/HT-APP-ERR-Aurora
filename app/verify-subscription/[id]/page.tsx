"use client"
import { getJobAlertId, updateJobAlert } from '@/components/JobAlerts/jobAlert';
import { Container } from '@mantine/core';
import React, { useEffect, useState } from 'react'

const Page = ({ params }:any) => {
  const { id } = params;
  
    const [jobAlertData, setJobAlertData] = useState<any | null>(null);
  const fetchJobAlert = async () => {
      try {
        await updateJobAlert(Number(id),{verified:true});
        const response =await getJobAlertId(Number(id));
              setJobAlertData(response?.data);
        setJobAlertData(response?.data);
      } catch {
        // setMessage("Error fetching job alert content");
      }
    };
      useEffect(() => {
        fetchJobAlert();
      }, [id]);
    
  return (
    <>
    <Container>
      <div style={{textAlign:"center",margin:100}}>
      {
        jobAlertData ?
        <>
        <h1>Thank You for Subscribing!</h1>
        <p>
          Thank you for subscribing to <strong>{jobAlertData?.frequency || ''}</strong> job alerts on
          HappyTechies! We’re excited to connect you with the latest opportunities in
          <strong> {jobAlertData?.job_category || ' '}</strong>.
        </p>
        </>
        : <p>Loading....</p>
      }
      </div>
     

    </Container>
    </>

  )
}

export default Page
