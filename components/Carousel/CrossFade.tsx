import React, { useEffect } from "react";
import Slider from "react-slick";
import { Box } from "@mantine/core";
import Image from "next/image";
import Head from "next/head";

export const CrossfadeCarousel = () => {
  const data = [
    "/images/hero/2.jpg",
    "/images/hero/4.jpg",
    "/images/hero/5.jpg",
    "/images/hero/6.jpg",
  ];

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    width: "100%",
  };

  return (
    <>
      
    <Slider {...settings}>
      {data.map((image, index) => (
        <Box key={index}>
          <Image
            className="hero_image"
            loading={index === 0 ? "eager" : "lazy"} 
            layout="responsive" 
            height={510}
            width={810}
            key={index}
            src={image}
            alt="Tech professionals exploring Microsoft job opportunities"
            style={{
              filter: "brightness(0.8)",
              borderRadius: "0.5rem",
            }}
            placeholder="blur" // Blur placeholder for smooth loading
            blurDataURL="data:image/svg+xml;base64,...your_blurred_base64_data..." // Optionally, use a base64-encoded placeholder
            priority={index === 0} // Preload the first image
          />
        </Box>
      ))}
    </Slider>
    </>

  );
};
