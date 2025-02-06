import { Hero } from "@/components/Hero/Hero";
import MyJobs from "@/components/MyJobs/index";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PostJob({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const supabase = createClient();
  const listData ={
    count: 0,
    step:1,
  }
  const userdata = await supabase.auth.getUser();
  console.log("User: ", userdata?.data?.user?.id);
  if (userdata?.data?.user?.id) {
    const { data: empData, error: empError } = await supabase
      .from("employer_details")
      .select("*")
      .eq("id", userdata?.data?.user?.id);

    console.log("==========", empData);
    if (empError) {
      console.error("Error fetching user:", empError);
      return;
    }
    if (!(empData && empData.length > 0 && empData[0].is_employer_login)) {
      redirect("/employers-login");
    }
  } else {
    redirect("/employers-login");
  }

 

// const result = await getData({limit:20, step:1});
// const { data, count } = result;


  // const signUp = async (pageData: any) => {
  //   "use server";
  //   console.log("formData", pageData);
    
  //   const { data, count } = await getData(pageData);
  //   return ;
  // };

  return (
    <div>
      <Hero
        title="My Posted Jobs"
        subtitle=""
        align="center"
        role="Employer" 
        page="my-jobs"
      />

      <MyJobs 
      // searchParams={searchParams}  
      showPagination={true} />
    </div>
  );
}
