"use client";

import React, { useEffect, useState } from "react";
import styles from "./CardCompany.module.css";
import { CardImage } from "../CardImage/CardImage";
import { fetchGlassdoorRating } from "@/app/actions";

interface CardCompanyProps {
  companyLogo: string | null;
  companyName: string | null;
  companyDescription: string | null;
  id: string;
}

const CardCompany: React.FC<CardCompanyProps> = ({
  companyLogo,
  companyName,
  companyDescription,
  id
}) => {
  const [rating, setRating] = useState<{ rating: any; reviewCount: any; } | null>(null);
  useEffect(() => {
    fetchGlassdoorRating(id)
      .then(response => {
        console.log(response);
        setRating(response);
      })
      .catch(error => {
        console.error("Error fetching rating:", error);
      });
  }, [id]);

  return (
    <div className={styles.card}>
      <div className={styles.logo}>
        <CardImage employer_logo={companyLogo || ""} />
      </div>
      <h2 className={styles.companyName}>{companyName}</h2>
      <p className={styles.companyDescription}>{companyDescription}</p>
    </div>
  );
};

export default CardCompany;
