import { Hero } from "@/components/Hero/Hero";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DraftTable from "./DraftTable";
import { Container, Text, Box } from "@mantine/core";

export default async function Draft(
//   {
//   searchParams,
// }: {
//   searchParams: { [key: string]: string };
// }
) {
  const supabase = createClient();
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


 
  return (
    <div>
      <Box
        mx="auto"
        style={{
          maxWidth: "85%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "23px",
            fontWeight: 600,
            color: "#000",
          }}
        >
          Saved Job Drafts
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <Text size="lg" fw={600} c="#00000099">
            View All
          </Text>
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5H15M15 5L11 9M15 5L11 1"
              stroke="black"
              stroke-opacity="0.6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </Box>
      <div>
        <DraftTable
          // searchParams={searchParams}
          showPagination={false}
        />
      </div>
    </div>
  );
}
