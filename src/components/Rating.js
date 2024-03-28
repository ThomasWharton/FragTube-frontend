import React, { useEffect, useState } from "react";
import styles from "../styles/Rating.module.css";
import { axiosReq } from "../api/axiosDefaults";

// The basic component code came from this youtube tutorial - https://www.youtube.com/watch?v=eDw46GYAIDQ&t

const Rating = (props) => {
  const { post_id, userRating, updateRating } = props;

  useEffect(() => {
    setRating(userRating);
  }, [userRating]);

  const handleRating = async (ratingValue) => {
    try {
        await axiosReq.post("/ratings/", {
        rating: ratingValue,
        post: post_id,
      });
      setRating(ratingValue);
      updateRating(ratingValue);
    } catch (err) {
      console.error(err);
    }
  };

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className={styles.Rating}>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={`rating-${ratingValue}`}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <i
              className={`fa fa-star ${styles.Star}`}
              style={{
                color: ratingValue <= (hover || rating) ? "#FF0000" : "#E4E4E4",
              }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
