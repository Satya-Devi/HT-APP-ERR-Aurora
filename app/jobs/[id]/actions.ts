"use server";

import { JobData } from "@/utils/interface";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function jobExistsForUser(userId: string, jobId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("job_id")
    .eq("user_id", userId)
    .eq("job_id", jobId);

  if (error) {
    console.error(`Error fetching job: ${error.message}`);
    return null;
  }

  return data && data.length > 0;
}

export async function saveJob(userId: string, job: JobData) {
  if (!userId || !job?.id) {
    return { error: 'Missing required parameters' };
  }

  const supabase = createClient();
  try {
    const jobExists = await jobExistsForUser(userId, job.id);
    if (jobExists) {
      return { status: 'exists' };
    }

    const { data, error } = await supabase.from("saved_jobs").insert({
      user_id: userId,
      job_id: job.id,
      job_title: job.job_title || null,
      job_description: job.job_description || null,
      company_name: job.company_name || null,
      job_location: job.job_location || null,
      job_listing_source_url: job.job_listing_source_url || null,
      skills: job.skills || null,
      employer_logo: job.employer_logo || null,
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath(`/`);
    return { data };
  } catch (err) {
    return { error: 'Failed to save job' };
  }
}


export async function unsaveJob(userId: string, jobId: string) {
  if (!userId || !jobId) {
    return { error: 'Missing required parameters' };
  }

  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("user_id", userId)
      .eq("job_id", jobId);

    if (error) {
      return { error: error.message };
    }

    revalidatePath(`/`);
    return { data };
  } catch (err) {
    return { error: 'Failed to unsave job' };
  }
}
