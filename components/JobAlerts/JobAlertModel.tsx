"use client";
import React, { useEffect, useState } from "react";
import styles from "./JobAlerts.module.css";
import {
  Button,
  Checkbox,
  Modal,
  Select,
  Text,
  TextInput,
  Alert,
} from "@mantine/core";
import Link from "next/link";
import { insertJobAlert } from "./InsertJobAlert";
import { updateJobAlert } from "./jobAlert";
import { notifications } from "@mantine/notifications";
const KeyAreas = {
    "Data & AI": "Data and AI",
    Security: "Security",
    "Modern Workplace and Surface": "Modern Work",
    Infrastructure: "Infrastructure",
    "Business Applications": "Business Applications",
    "Digital & Application Innovation": "Digital and App Innovation",
  };
  
const JobAlertModal = ({open, setOpen,fetchAlerts,editVal}:any) => {

      const [jobAlertForm, setJobAlertForm] = useState<any>(  {
        email: "",
        job_category: "",
        frequency: "",
        tos: false,
      });
      const [errors, setErrors] = useState({
        email: "",
        job_category: "",
        frequency: "",
        tos: "",
        submit: "",
      });
    
      const [formSubmitted, setFormSubmitted] = useState(false);
       useEffect(() => {
        setJobAlertForm({...editVal,tos:editVal ?true :false})      
        }, [editVal,open]);
      
        // Handle form input change
        const handleInputChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
          const { name, value } = e.target;
          console.log(e);
          setJobAlertForm((prevState:any) => ({
            ...prevState,

            [name]: value,
          }));
        };
      
        // Validate form fields
        const validateForm = () => {
          let isValid = true;
          const newErrors: any = {};
      
          if (!jobAlertForm.email) {
            newErrors.email = "Email is required";
            isValid = false;
          }
      
          if (!jobAlertForm.job_category) {
            newErrors.job_category = "Job category is required";
            isValid = false;
          }
      
          if (!jobAlertForm.frequency) {
            newErrors.frequency = "Frequency is required";
            isValid = false;
          }
      
          if (!jobAlertForm.tos) {
            newErrors.tos = "You must agree to the Privacy Policy";
            isValid = false;
          }
      
          setErrors(newErrors);
          return isValid;
        };
      
        // Handle form submission
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
      
          if (validateForm()) {
            // Submit to Supabase
            const { email, job_category, frequency } = jobAlertForm;
            let response
            if(jobAlertForm?.id){
              response = await updateJobAlert(jobAlertForm?.id,{email, job_category, frequency});
             

            }else{

              response = await insertJobAlert({ email, job_category, frequency });
               
            }
      
            if (response.error) {
              console.log("Error inserting data: ", response.error);
              setErrors({ ...errors, submit: response.error });
            } else {
              setFormSubmitted(true);
              console.log("Form submitted successfully:", response.data);
              handleCloseModal();
              if(jobAlertForm?.id){
                notifications.show({
                  title: "Alert updated successfully!",
                  message: "The job has been updated successfully!",
                  color: "green",
                });
  
              }else{
  
                notifications.show({
                  title: "Alert created successfully!",
                  message: "Please verify it from your email to complete the process.",
                  color: "green",
                });
                
              }
              fetchAlerts()
            }

          }
        };
      
        const handleCloseModal = () => {
          setJobAlertForm({
            email: "",
            job_category: "",
            frequency: "",
            tos: false,
          });
          setErrors({
            email: "",
            job_category: "",
            frequency: "",
            tos: "",
            submit: "",
          });
          setOpen(false);
        };
        
  return (
    <>
  <Modal
        opened={open}
        onClose={handleCloseModal}
        title="Get job alerts by email!"
        centered
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <div style={inputContainerStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <TextInput
              name="email"
              value={jobAlertForm.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              disabled={editVal}
              size="md"
            />
            {errors.email && (
              <Text size="sm" c="red" mt="xs">
                {errors.email}
              </Text>
            )}
          </div>
          <div style={inputContainerStyle}>
            <label htmlFor="job_category" style={labelStyle}>
              Job Category
            </label>
            <Select
              name="job_category"
              value={jobAlertForm.job_category}
              onChange={(value: string | null) =>
                setJobAlertForm((prevState:any) => ({
                  ...prevState,
                  job_category: value || "",
                }))
              }
              placeholder="Select job category"
              data={Object.entries(KeyAreas).map(([key, value]) => ({
                value: value, // Send the value (not the key)
                label: key, // Display the key in the dropdown
              }))}
              size="md"
              required
            />
            {errors.job_category && (
              <Text size="sm" c="red" mt="xs">
                {errors.job_category}
              </Text>
            )}
          </div>
          <div style={inputContainerStyle}>
            <label htmlFor="frequency" style={labelStyle}>
              Frequency
            </label>
            <Select
              name="frequency"
              value={jobAlertForm.frequency}
              onChange={(value: string | null) =>
                setJobAlertForm((prevState:any) => ({
                  ...prevState,
                  frequency: value || "",
                }))
              }
              size="md"
              placeholder="Select frequency"
              data={["Weekly", "Monthly"]}
              required
            />
            {errors.frequency && (
              <Text size="sm" c="red" mt="xs">
                {errors.frequency}
              </Text>
            )}
          </div>
          <div style={{ marginBottom: "10px", marginTop: "10px" }}>
            <Checkbox
              type="checkbox"
              name="tos"
              checked={jobAlertForm.tos}
              onChange={(e) =>
                setJobAlertForm((prevState:any) => ({
                  ...prevState,
                  tos: e.target.checked,
                }))
              }
              //   required
              label={
                <>
                  I agree to receive job alerts email and accept the{" "}
                  <Link
                    href="/privacy-policy"
                    onClick={handleCloseModal}
                    style={{
                      color: "#004a93",
                      fontSize: "14px",
                      textDecoration: "none",
                    }}
                  >
                    Privacy Policy
                  </Link>
                </>
              }
            />
            {errors.tos && (
              <Text size="sm" c="red" mt="xs">
                {errors.tos}
              </Text>
            )}
            {errors.submit && (
              <Text size="sm" c="red" mt="xs">
                {errors.submit}
              </Text>
            )}
          </div>
          <Button style={buttonStyle} fullWidth type="submit">
            {jobAlertForm?.id ? "Update" : "Submit"}
          </Button>
        </form>
      </Modal>

    </>
  )
}
const inputContainerStyle = {
    marginBottom: "10px",
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
    //   border: "1px solid #e0e0e0",
    fontSize: "16px",
  };
  
  const buttonStyle = {
    backgroundColor: "#004a93",
    color: "white",
    height: "40px",
    fontSize: "16px",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };
  
export default JobAlertModal