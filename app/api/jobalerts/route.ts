import { JobEmailTemplate } from '@/templates/emails/jobAlertEmail';
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(request.url);
    const frequency = searchParams.get("frequency") as "Weekly" | "Monthly";
    console.log("frequency",frequency);
    if (!frequency || !["Weekly", "Monthly"].includes(frequency)) {
      return NextResponse.json(
        { error: "Invalid or missing frequency parameter" },
        { status: 400 }
      );
    }

    const timeThreshold = new Date(
      Date.now() - (frequency === "Weekly" ? 7 : 30) * 24 * 60 * 60 * 1000
    ).toISOString();

    const { data: alerts, error: alertsError } = await supabase
      .from("job_alerts")
      .select("email, job_category ,id,frequency")
      .eq("frequency", frequency)
      .eq("verified", true);

    if (alertsError) {
      throw new Error(`Error fetching job alerts: ${alertsError.message}`);
    }

    if (!alerts || alerts.length === 0) {
      return NextResponse.json(
        { message: "No job alerts found for the specified frequency" },
        { status: 200 }
      );
    }
    console.log(alerts, "alerts");

    // Process each alert
    for (const alert of alerts) {
      const { email, job_category } = alert;
      console.log(job_category, "job_category");
      const { data: jobs, error: jobsError }:any = await supabase
        .from("jobs")
        .select("job_title, company_name, created_at,solution_area,id")
        .eq("solution_area", job_category)
        .gt("created_at", timeThreshold);

      console.log(jobs, "jobs");
      if (jobsError) {
        throw new Error(`Error fetching jobs: ${jobsError.message}`);
      }

      if (jobs && jobs.length > 0) {
        console.log("jobs",jobs);

        const rsp = await resend.emails.send({
          // from: "info@quickrecord.in",
          from: 'info@happytechies.com',
          to: email,
          subject:`New job listings - in ${alert?.job_category}`,
          react: JobEmailTemplate({ jobs, alert }) as React.ReactElement
        })

        console.log(`Email sent to ${email}`, rsp);
      }
    }

    return NextResponse.json(
      { message: "Job alerts sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending job alerts:", error);

    return NextResponse.json(
      { error: "Error sending job alerts", details: (error as Error).message },
      { status: 500 }
    );
  }
};
