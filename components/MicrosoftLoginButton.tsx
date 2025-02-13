"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@mantine/core";
import Image from "next/image";

export default function MicrosoftLoginButton() {
  const handleLoginWithMicrosoft = () => {
    const supabase = createClient();
  
    supabase.auth
      .signInWithOAuth({
        provider: "azure",
        options: {
          scopes: "email openid profile User.Read",
          redirectTo: process.env.NEXT_PUBLIC_REDIRECTIONTO,
          // redirectTo: "http://localhost:3000/"
        },
      })
      .then(({ data, error }) => {
        console.log("Data:", data);
        if (error) {
          console.error("Error signing in:", error);
        } else {
          console.log("Signed in successfully:", data);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };
  

  return (
    <Button
      onClick={handleLoginWithMicrosoft}
      styles={(theme) => ({
        root: {
          backgroundColor: "transparent",
          border: "none",
          padding: 0,
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      })}
    >
      <Image
        src="/images/icons/microsoft.svg"
        alt="Microsoft"
        width={24}
        height={24}
      />
    </Button>
  );
}