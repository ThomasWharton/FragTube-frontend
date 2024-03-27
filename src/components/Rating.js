import React, { useEffect, useState } from "react";
import styles from "../styles/Rating.module.css";
import { axiosReq } from "../api/axiosDefaults";

const Rating = (props) => {
  const { id, post_id, setPosts } = props;

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const { data } = await axiosReq.get(`/ratings/${id}`, {
          post: post_id,
        });
        setRating(data.rating);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchRating();
  }, [id, post_id]);

  const handleRating = async (ratingValue) => {
    try {
      setRating(ratingValue);
      const { data } = await axiosReq.post("/ratings/", { rating: ratingValue, post: post_id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === post_id
            ? { ...post, average_rating: post.average_rating, rating_id: data.id }
            : post;
        }),
      }));
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
              onClick={handleRating}
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
