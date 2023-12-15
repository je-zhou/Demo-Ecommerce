import { Review } from "@/types";

export function getAverageRating({reviews}: {reviews: Review[]}) {
  let totalRating = 0;

  reviews.forEach(review => {
    totalRating += review.rating
  });


  return totalRating / reviews.length
}