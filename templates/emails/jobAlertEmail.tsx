import React from "react";


const JobEmailTemplate: React.FC<Readonly<any>> = ({
  jobs,
  alert,
}:any) => {
  function timeAgo(dateString: string | Date): string {
    const givenDate = new Date(dateString); // Parse the input date
    const currentDate = new Date(); // Get the current date and time

    // Calculate the difference in milliseconds
    const differenceInMs = currentDate.getTime() - givenDate.getTime();

    // Convert milliseconds to hours
    const hoursAgo = Math.floor(differenceInMs / (1000 * 60 * 60));

    // Determine if it's today or earlier
    if (hoursAgo < 24) {
      return hoursAgo === 0 ? "Just now" : `${hoursAgo} hour(s) ago`;
    } else {
      const daysAgo = Math.floor(hoursAgo / 24);
      return `${daysAgo} day(s) ago`;
    }
  }


  return (

    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #eaeaea",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="https://happytechies.com/images/logo.png" alt="logo" width={130} height={45} />
        <h1 style={{ fontSize: "24px", color: "#333", margin: "4px 0" }}>
          Your job alert for <span style={{ color: "#0073b1" }}>{alert?.job_category}</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#666", margin: "4px 0" }}>
          {jobs?.length} new jobs match your preferences.
        </p>
      </div>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {jobs?.map((job:any, index:number) => {

          if (index < 6)
            return (
              <li
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "15px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    borderRadius: "12px",
                    padding: "4px",
                    width: "100%",
                    fontFamily: "Arial, sans-serif",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      display: "flex",
                      marginBottom: "16px",

                    }}
                  >
                    <img
                      style={{ height: 56, width: 56 }}
                      src={job?.employer_logo || "https://happytechies.com/images/company_placeholder.png"} alt="" />
                    <span style={{
                      width: "100%",
                      marginLeft: 4
                    }}>
                      {job?.job_title} {" "}
                      <span
                        style={{
                          marginLeft: "8px",
                          color: "#ff5722",
                        }}
                      >
                        🔥
                      </span>
                    </span>
                    <span style={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      marginTop: "22px",
                      color: "#0073e6",
                    }}>
                      {timeAgo(job?.created_at)}

                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        width: "100%",
                        gap: "5px",
                        fontSize: "14px",
                      }}
                    >
                      <span>{job?.company_name}</span>
                      <span>📍</span>
                      <span>{job?.job_location}</span>
                    </span>
                    {job?.skill?.length > 0 &&
                      <button
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #0073e6",
                          color: "#0073e6",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {job?.skill?.[0]}
                      </button>
                    }
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <a
                      style={{
                        display: "inline-block",
                        padding: "5px 10px",
                        background: "#0073b1",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "5px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        transition: "background-color 0.2s",
                      }}
                      href={`https://happytechies.com/jobs/${job?.id}`}>Apply</a>

                  </div>
                </div>
              </li>
            )


        })}
      </ul>
      <div style={{ textAlign: "right" }}>
        <a
          href={`https://happytechies.com/jobs?filter=${alert?.job_category?.replace(/ /g, '+')}&frequency=${alert?.frequency}`}
          style={{
            display: "inline-block",
            padding: "8px",
            background: "#0073b1",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "background-color 0.2s",
          }}
        >
          Browse All
        </a>
      </div>
      <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#888" }}>
       

        <p>
         <span   style={{ fontWeight:"bold"}}>Disclaimer:- </span> You are receiving this email because you signed up for job alerts at <a
            href={`https://happytechies.com`}
            style={{ color: "#0073b1" ,fontWeight:"bold"}}
          > HappyTechies.com </a> To stop receiving these emails please click <a
            href={`https://happytechies.com/unsubscribe/${alert?.id}`}
            style={{ color: "#0073b1" ,fontWeight:"bold"}}
          >
            unsubscribe
          </a>
        </p>
        {/* <p style={{ margin: "10px 0" }}>
                If you have any questions or feedback, please contact our support team at <a href="mailto:support@example.com" style={{ color: "#0073b1", textDecoration: "none" }}>support@example.com</a>.
            </p> */}
      </div>
    </div>
  );
}

export { JobEmailTemplate };
