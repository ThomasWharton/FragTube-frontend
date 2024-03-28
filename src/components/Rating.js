import React, { useCallback, useEffect, useState } from "react";
import styles from "../styles/Rating.module.css";
import { axiosReq } from "../api/axiosDefaults";

const Rating = (props) => {
  const { id, post_id, setPosts } = props;

  const fetchRating = useCallback(async () => {
    try {
      const { data } = await axiosReq.get(`/ratings/${id}`, {
        post: post_id,
      });
      setRating(data.rating);
    } catch (err) {
      // console.log(err);
    }
  }, [id, post_id]);

  useEffect(() => {
    fetchRating();
  }, [fetchRating]);

  

  const handleRating = async (ratingValue) => {
    console.log(ratingValue)
    setRating(ratingValue);
    console.log(rating)
    try {
      const { data } = await axiosReq.post("/ratings/", { rating: rating, post: post_id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === post_id
            ? { ...post, average_rating: post.average_rating, rating_id: data.id }
            : post;
        }),
      }));
      fetchRating();
    } catch (err) {
      // console.log(err);
    }
    
  };

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
