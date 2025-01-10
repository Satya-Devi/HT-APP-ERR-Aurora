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

export default function GoogleLoginButton() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialResponse = async (response: any) => {
    console.log("Received ID token:", response);
    try {
      setIsLoading(true);
  
      // Check for ID token presence
      if (!response.credential) {
        throw new Error("No ID token received");
      }
  
      // Authenticate with Supabase using the ID token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
      });
  
      // Handle sign-in error early
      if (error) {
        console.error("Authentication error:", error);
        throw error;
      }
  
      console.log("Sign-in data:", data);
  
      const emailCred = data?.user?.email;
      if (!emailCred) {
        console.warn("User data is not available");
        return;
      }
  
      // Check if the user already exists in the users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", emailCred)
        .maybeSingle(); // Use maybeSingle() to handle zero rows gracefully
  
      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }
  
      const userDataInfo = data?.session?.user;
      const userNameMeta = data?.user?.user_metadata;
  
      // If user doesn't exist, insert new user
      if (!userData && userDataInfo && userNameMeta) {
        const { data: insertData, error: insertError } = await supabase.from("users").insert([
          {
            id: userDataInfo.id,
            email: userDataInfo.email ?? null,
            password: "google-oauth-placeholder",
            provider: userDataInfo.app_metadata.provider ?? null,
            display_name: userNameMeta.name,
            created_at: new Date().toISOString(),
          },
        ]);
  
        if (insertError) {
          console.error("User insertion error:", insertError);
        } else {
          console.log("User inserted successfully:", insertData);
        }
      }
  
      console.log("Signed in successfully:", data);
      router.push("/jobs");
    } catch (error) {
      console.error("Error in sign-in process:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      return script;
    };

    const script = loadGoogleScript();

    script.onload = () => {
      console.log("Google script loaded successfully");

      // Initialize Google One Tap with ID token response handling
      window.google.accounts.id.initialize({
        client_id: "67210046265-bo0guguu49jnffl6lojhclpu8sqgfs49.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        callback: handleCredentialResponse,
        cancel_on_tap_outside: false,
      });
    };

    script.onerror = () => {
      console.error("Error loading Google script");
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
        width: '50px',
        height: '50px',
        padding: 0,
        borderRadius: '50%',
        border: '1px solid #fff',
        background: 'white',
        cursor: isLoading ? 'wait' : 'pointer',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        src="/images/icons/google.svg"
        alt="Sign in with Google"
        width={24}
        height={24}
        style={{
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 0.3s',
        }}
      />
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
        }}>
        </div>
      )}
    </button>
  );
}
