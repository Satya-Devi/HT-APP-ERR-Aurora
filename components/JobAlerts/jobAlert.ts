"use server"
import { createClient } from "@/utils/supabase/server";
import { notifications } from "@mantine/notifications";
// Initialize Supabase client (replace with your Supabase URL and anon key)
const supabase = createClient();

/**
 * Inserts a new job alert into the job_alerts table.
 * @param {Object} jobAlert - The job alert object containing email, job category, frequency, and created_at.
 * @returns {Object} - The response data or error from Supabase.
 */
export const getJobAlert = async () => {
  try {
    // Check if the user is already subscribed to the same job_category and frequency
     const {
          data: { user },
        } = await supabase.auth.getUser();
      console.log(user);
    const { data, error } = await supabase
      .from('job_alerts')
      .select("*")
      .eq('email', user?.email)
      .eq('verified', true)

      console.log(data);
    return {
      data,
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
export const getJobAlertId = async (id:any) => {
  try {
    // Check if the user is already subscribed to the same job_category and frequency
   console.log(id);
    const { data, error } = await supabase
      .from('job_alerts')
      .select("*")
      .eq('id', id )
      .single(); 

      console.log(data);
    return {
      data,
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
export const deleteJobAlert = async (id:any) => {
  try {
    
    const { data, error } = await supabase
      .from('job_alerts')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message);
    }

    console.log('Deleted job alerts:', data);
    
    return {
      data,
      error: null,
    };
  } catch (err) {
    const errorMessage = (err as Error).message; // Type assertion to Error
    console.error('Error deleting job alert:', errorMessage);
    return {
      error: errorMessage || 'Something went wrong.',
    };
  }
};

export const updateJobAlert = async (id: any, updates: Record<string, any>) => {
  try {
    // Update the job alerts for the provided id with the given updates
    const { data, error } = await supabase
      .from('job_alerts')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    console.log('Updated job alert:', data);
    return {
      data,
      error: null,
    };
  } catch (err) {
    const errorMessage = (err as Error).message; // Type assertion to Error
    console.error('Error updating job alert:', errorMessage);
    return {
      error: errorMessage || 'Something went wrong.',
    };
  }
};
