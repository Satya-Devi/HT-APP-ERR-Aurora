"use client";
import { useEffect } from "react";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category?: string };
}) {
  useEffect(() => {
    if (params?.category) {
      const formattedCategory = params.category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char: string) => char.toUpperCase());

      // Update document title
      document.title = `${formattedCategory} Jobs`;

      // Update meta description
      const metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Looking for ${formattedCategory} Jobs? Join the leading job board for ${formattedCategory} opportunities and let our AI assistant help you discover the perfect position.`
        );
      } else {
        const newMeta = document.createElement("meta");
        newMeta.setAttribute("name", "description");
        newMeta.setAttribute(
          "content",
          `Looking for ${formattedCategory} Jobs? Join the leading job board for ${formattedCategory} opportunities and let our AI assistant help you discover the perfect position.`
        );
        document.head.appendChild(newMeta);
      }
    }
  }, [params?.category]);

  return <main>{children}</main>;
}
