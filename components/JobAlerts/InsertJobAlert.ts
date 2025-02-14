"use server"
import { Template } from "@/templates/emails/confirmation";
import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend";
// Initialize Supabase client (replace with your Supabase URL and anon key)
const supabase = createClient();

/**
 * Inserts a new job alert into the job_alerts table.
 * @param {Object} jobAlert - The job alert object containing email, job category, frequency, and created_at.
 * @returns {Object} - The response data or error from Supabase.
 */
const resend = new Resend(process.env.RESEND_API_KEY);

export const insertJobAlert = async ({ email, job_category, frequency }:any) => {
  try {
    // Check if the user is already subscribed to the same job_category and frequency
    const { data, error } = await supabase
      .from('job_alerts')
      .select("*")
      .eq('email', email)  // Ensure the same email
      .eq('job_category', job_category) // Ensure the same job category
      .eq('frequency', frequency); // Ensure the same frequency

    if (data && data.length > 0) {
      // If data length is greater than 0, the user is already subscribed to this combination
      return {
        error: 'You are already subscribed to this category and frequency.',
      };
    }

    // If no existing subscription, insert the new subscription
    const { error: insertError } = await supabase
      .from('job_alerts')
      .insert([{ email, job_category, frequency }]);

    if (insertError) {
      throw insertError;
    }
    const insertedData= await  supabase
    .from('job_alerts')
    .select("*")
    .eq('email', email)  // Ensure the same email
    .eq('job_category', job_category) // Ensure the same job category
    .eq('frequency', frequency)
    .single();
    console.log(insertedData);

    await resend.emails.send({
      from: '"Happy Techies" <info@happytechies.com>', // Add the sender name here
      to: email,
      subject: "Job alert verification",
      react: Template({ data: { job_category, frequency, id: insertedData?.data?.id } }) as React.ReactElement,
    });
    
    return {
      data: 'Subscription added successfully.',
      error: null,
    };
  } catch (err) {
    const errorMessage = (err as Error).message; // Type assertion to Error
    console.error('Error inserting job alert:', errorMessage);
    return {
      error: errorMessage || 'Something went wrong.',
    };
  }
};