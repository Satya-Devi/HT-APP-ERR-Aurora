"use client"
import React, { useEffect, useState } from 'react';
import {
  Card,
  Text,
  Group,
  Button,
  Badge,
  ActionIcon,
  Stack,
  Grid,
} from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import classes from "./tracker.module.css";
import { deleteJobAlert, getJobAlert } from '@/components/JobAlerts/jobAlert';
import JobAlerts from '@/components/JobAlerts/JobAlerts';
import { notifications } from "@mantine/notifications";
import EditJobAlert from '@/components/JobAlerts/JobAlertModel';
function SubscriptionCard() {

  const [subscriptions, setSubscriptions] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [editVal, setEditVal] = useState(null)
 
  useEffect(() => {
    
    fetchAlerts()
  }, [])
  const fetchAlerts = async () => {
   
    const response: any = await getJobAlert()
    console.log(response);
    setSubscriptions(response?.data)
  }
  const handleDelete = async (id: number) => {
    debugger

    await deleteJobAlert(id)
    notifications.show({
      title: "Alert deleted successfully!",
      message: "The job has been deleted successfully!",
      color: "red",
    });
    await fetchAlerts()
  }

  return (
    <>
    {
      subscriptions?.length>0 && <Card shadow="sm" padding="lg" radius="md" withBorder>
      <span className={classes.mainHeading}>
        My Subscriptions
      </span>
    
      <div className={classes.headings}>
        <span>Job Category</span>
        <span>Frequency</span>
      </div>
      <Stack >
        {subscriptions?.map((subscription:any, index:number) => (
          <Group
            key={index}
            align="center"
          >
            <Grid flex={1} align="center" grow>
              <Grid.Col span={6}>
                <button className={classes.frequency}
                >
                  {subscription.job_category}
                </button>
              </Grid.Col>
              <Grid.Col span={3}>
                <button className={classes.frequency}
                >
                  {subscription.frequency}
                </button>

              </Grid.Col>
              <IconTrash onClick={() => { handleDelete(subscription?.id) }} className={classes.icons} size={32} color="#004A93" />
              <IconEdit onClick={() => { setOpen(true); setEditVal(subscription) }} className={classes.icons} size={32} color="#004A93" />

            </Grid>
          </Group>
        ))}
      </Stack>
      <button onClick={() => { setOpen(true);setEditVal(null) }} className={classes.subscriptionCta} color="#004A93" >
        Add Subscription
      </button>
      <EditJobAlert editVal={editVal} fetchAlerts={fetchAlerts} open={open} setOpen={setOpen} />
    </Card>
    }
    </>
    
  );
}

export default SubscriptionCard;
