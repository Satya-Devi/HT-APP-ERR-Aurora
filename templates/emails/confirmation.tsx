export const Template = ({ data  }:any) => {
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
          color: "#333",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
         
        }}
      >
      
      <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      >
      <div style={{
        textAlign: "center",
        
      }}>

      <img src="https://happytechies.com/images/logo.png" alt="logo" width={130} height={45} />
      <h2>Confirmation for job alert</h2>
      </div>

        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          
        </div>
        <p>
         Dear Techie,
          <br />
          Thank you for subscribing to {data?.frequency || "-"} job alerts on
          HappyTechies! We’re excited to connect you with the latest opportunities
          in {data?.job_category || "-"}.
        </p>
        <p>To confirm your subscription, kindly click on the "Verify" button.</p>
        <a
        href={`https://happytechies.com/verify-subscription/${data?.id}`}

          style={{
            display: "inline-block",
            backgroundColor: "#0078D4",
            color: "#fff",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "4px",
            margin: "5px 0",
          }}
        >Verify</a>
        <p>
          Stay tuned for tailored updates, designed to help you find your perfect
          role in Microsoft technologies.
        </p>
      
        <a
        href={`https://happytechies.com/jobs?filter=${data?.job_category?.replace(/ /g, '+')}`}

          style={{
            display: "inline-block",
            backgroundColor: "#0078D4",
            color: "#fff",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "4px",
            margin: "5px 0",
          }}
        >
          Browse Jobs
        </a>
        <p>
          Best regards,
          <br />
          Team <a style={{ color: "#0078D4",fontWeight:"bold" }} href={"https://happytechies.com/" }>HappyTechies</a>  | <a style={{ color: "#0078D4",fontWeight:"bold"  }}  href={"https://happytechies.com/contact-us"}>Contact Us</a>
        </p>
      </div>

      </div>
    );
  };
   