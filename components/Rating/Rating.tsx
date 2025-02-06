"use client";
import { Rating as StarRating } from "react-simple-star-rating";

interface RatingComponentProps {
  rating: number;
}

export const RatingComponent = ({ rating }: RatingComponentProps) => {
  return (
    <>
      <StarRating initialValue={rating || 0} size={20} readonly allowFraction />
    </>
  );
};
