"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@mantine/core";
import { useState } from "react";
import Image from "next/image";

export default function MicrosoftLoginButton({ role }: { role?: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginWithMicrosoft = () => {
    setIsLoading(true);
    const supabase = createClient();

    if (!supabase) {
      console.error("Supabase client is not initialized.");
      return;
    }
    
    supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email openid profile User.Read',
        redirectTo: process.env.NEXT_PUBLIC_REDIRECTIONTO,
        // redirectTo: "http://localhost:3000/"
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
      onClick={handleLoginWithMicrosoft}
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
        src="/images/icons/microsoft.svg"
        alt="Microsoft"
        width={24}
        height={24}
      />
    </Button>
  );
}
