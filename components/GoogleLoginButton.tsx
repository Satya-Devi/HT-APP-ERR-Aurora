"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleLoginButton({ role }: { role?: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialResponse = (response: any) => {
    if (!response.credential) {
      throw new Error("No ID token received");
    }

    setIsLoading(true);
    if (supabase) {
      supabase.auth
        .signInWithIdToken({
          provider: "google",
          token: response.credential,
        })
        .then(({ data, error }) => {
          if (error) throw error;
          return { data, emailCred: data?.user?.email };
        })
        .then(({ data, emailCred }) => {
          if (!emailCred) {
            throw new Error("User data unavailable");
          }

          if (role === "Employer") {
            return handleEmployerData(data, emailCred);
          }
          return handleUserData(data, emailCred);
        })
        .then(() => {
          role === "Employer" ? router.push("/overview") : router.push("/jobs");
        })
        .catch((error) => {
          console.error("Sign-in error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleEmployerData = (data: any, emailCred: string) => {
    if (!supabase) {
      console.error("Supabase client is not initialized");
      return;
    }
    return supabase
      .from("employer_details")
      .select("id")
      .eq("email", emailCred)
      .maybeSingle()
      .then(({ data: empData, error }) => {
        if (error) throw error;
        if (!empData) {
          const empInfo = data?.session?.user;
          const empMeta = data?.user?.user_metadata;
          return insertEmployerData(empInfo, empMeta);
        }
      });
  };

  const insertEmployerData = (empInfo: any, empMeta: any) => {
    if (!supabase) {
      console.error("Supabase client is not initialized");
      return;
    }
    return supabase.from("employer_details").insert([
      {
        id: empInfo.id,
        email: empInfo.email ?? null,
        provider: empInfo.app_metadata.provider ?? null,
        emp_name: empMeta.name,
        created_at: new Date().toISOString(),
      },
    ]);
  };

  const handleUserData = (data: any, emailCred: string) => {
    if (!supabase) {
      console.error("Supabase client is not initialized");
      return;
    }
    return supabase
      .from("users")
      .select("id")
      .eq("email", emailCred)
      .maybeSingle()
      .then(({ data: userData, error }) => {
        if (error) throw error;
        if (!userData) {
          const userInfo = data?.session?.user;
          const userMeta = data?.user?.user_metadata;
          return insertUserData(userInfo, userMeta);
        }
      });
  };

  const insertUserData = (userInfo: any, userMeta: any) => {
    if (!supabase) {
      console.error("Supabase client is not initialized");
      return;
    }
    return supabase.from("users").insert([
      {
        id: userInfo.id,
        email: userInfo.email ?? null,
        password: "google-oauth-placeholder",
        provider: userInfo.app_metadata.provider ?? null,
        display_name: userMeta.name,
        created_at: new Date().toISOString(),
      },
    ]);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id:
          "67210046265-bo0guguu49jnffl6lojhclpu8sqgfs49.apps.googleusercontent.com",
        scope:
          "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        callback: handleCredentialResponse,
        cancel_on_tap_outside: false,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSignIn = () => {
    if (isLoading) return;

    console.log("Displaying Google One Tap prompt");
    window.google.accounts.id.prompt(); // Display the Google One Tap prompt
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      style={{
        width: "50px",
        height: "50px",
        padding: 0,
        borderRadius: "50%",
        border: "1px solid #fff",
        background: "white",
        cursor: isLoading ? "wait" : "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src="/images/icons/google.svg"
        alt="Sign in with Google"
        width={24}
        height={24}
        style={{
          opacity: isLoading ? 0.5 : 1,
          transition: "opacity 0.3s",
        }}
      />
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
          }}
        ></div>
      )}
    </button>
  );
}
