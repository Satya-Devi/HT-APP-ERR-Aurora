"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@mantine/core";
import { useState } from "react";
import Image from "next/image";

export default function LinkedInLoginButton({ role }: { role?: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginWithLinkedIn = () => {
    setIsLoading(true);
    const supabase = createClient();
    if (!supabase) {
      console.error("Failed to create Supabase client");
      return;
    }
    
    supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECTIONTO!,
      },
    })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error signing in:", error);
          return;
        }
        console.log("Signed in successfully:", data);
      })
      .catch(error => {
        console.error("Login error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      onClick={handleLoginWithLinkedIn}
      styles={(theme) => ({
        root: {
          backgroundColor: 'transparent',
          border: 'none',
          padding: 0,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      })}
      disabled={isLoading}
    >
      <Image
        src="/images/icons/linkedin.svg"
        alt="LinkedIn"
        width={24}
        height={24}
      />
    </Button>
  );
}
