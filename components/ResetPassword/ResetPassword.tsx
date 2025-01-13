"use client";

import { Box, Modal, Text, Title, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState, useEffect } from "react";
import { SFProRounded } from "@/app/layout";
import { createClient } from "@/utils/supabase/client";

type Props = {
    searchParams: {
        code?: string
    }
}

export default function ResetPassword({ searchParams }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [success, setSuccess] = useState(false);
  const [errorM, setErrorM] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirm_password = formData.get("confirm password") as string;

    if (password !== confirm_password) {
      setMessage("Passwords don't match!");
      setErrorM(true);
      return;
    }

    setIsSubmitting(true);
    setErrorM(false);
    const supabase = createClient();

    if (!supabase) {
      console.error("Supabase client is not initialized.");
      return;
    }

    supabase.auth.updateUser({ password })
      .then(({ data, error }) => {
        if (error) {
          setMessage("Something went wrong!! Please try later.");
          setErrorM(true);
          return;
        }
        if (data) {
          setMessage("Password changed successfully!");
          setSuccess(true);
          setErrorM(false);
        }
      })
      .catch(error => {
        console.error(error);
        setMessage("An unexpected error occurred");
        setErrorM(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (searchParams?.code) {
      open();
    }
  }, [searchParams]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        close();
        setSuccess(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Modal opened={opened} onClose={close} centered size="lg">
      <Box ml={40} mr={40} mb={40}>
        <Title
          ta="left"
          order={1}
          className={SFProRounded.className}
          c="blue"
          mb={20}
        >
          New password
        </Title>
        <form>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="confirm password" style={labelStyle}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm password"
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>
          {success && <Text style={successText}>{message}</Text>}
          {errorM && <Text style={errorText}>{message}</Text>}
          <Button
            style={buttonStyle}
            type="submit"
            formAction={handleResetPassword}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Submit"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}


const inputContainerStyle = {
  marginBottom: "20px",
  marginTop: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: 500,
  fontSize: "14px",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #e0e0e0",
  fontSize: "16px",
};

const buttonStyle = {
  backgroundColor: "#004a93",
  color: "white",
  // padding: "10px",
  borderRadius: "20px",
  height: "40px",
  fontSize: "16px",
  fontWeight: 500,
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const successText = {
  color: "green",
  fontSize: "16px",
  fontWeight: 500,
  marginBottom: "10px"
};

const errorText = {
    color: "red",
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "10px"
  }