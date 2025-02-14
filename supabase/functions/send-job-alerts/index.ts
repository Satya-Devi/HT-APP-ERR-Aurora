// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Ensure environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    // Fetch job alerts and matching jobs
    const { data: alerts, error } = await supabase
      .from('job_alerts')
      .select('email, job_category, frequency');
      
    if (error) throw error;

    for (const alert of alerts) {
      const { email, job_category, frequency } = alert;

      const { data: jobs, error: jobError } = await supabase
        .from('jobs')
        .select('title, company, created_at')
        .eq('solution_area', job_category)
        .gt(
          'created_at',
          frequency === 'Weekly'
            ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        );

      if (jobError) throw jobError;

      if (jobs.length > 0) {
        const jobDetails = jobs.map((job) => ({
          title: job.title,
          company: job.company,
        }));

        // Send email with Resend
        await resend.emails.send({
          from: 'info@happytechies.com',
          to: email,
          subject: 'Your Job Alerts',
          html: `
            <p>Hi,</p>
            <p>Here are your latest job alerts:</p>
            <ul>
              ${jobDetails.map((job) => `<li>${job.title} - ${job.company}</li>`).join('')}
            </ul>
            <p>Thank you for subscribing!</p>
          `,
        });

        console.log(`Email sent to ${email}`);
      }
    }

    res.status(200).json({ message: 'Job alerts sent successfully' });
  } catch (error) {
    console.error('Error sending job alerts:', error);
    res.status(500).json({ error: 'Error sending job alerts' });
  }
}


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-job-alerts' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
