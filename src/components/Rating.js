import React, { useState } from "react";
import styles from "../styles/Rating.module.css";

const Rating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className={styles.Rating}>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <i
              className={`fa fa-star ${styles.Star}`}
              style={{
                color: ratingValue <= (hover || rating) ? "#FF0000" : "#E4E4E4"
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
