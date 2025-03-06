import React, { useCallback, useEffect, useState } from "react";
import styles from "../../styles/Post.module.css";
import {
  Row,
  Card,
  Media,
  OverlayTrigger,
  Tooltip,
  Col,
} from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import Rating from "../../components/Rating";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    embed_id,
    content,
    updated_at,
    postPage,
    setPosts,
    rating_id,
    average_rating,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(average_rating);

  const fetchRating = useCallback(async () => {
    try {
      if (!rating_id) {
        setUserRating(null);
        return;
      }
      const { data } = await axiosReq.get(`/ratings/${rating_id}`, {
        post: id,
      });
      setUserRating(data.rating);
    } catch (err) {
      console.error(err);
    }
  }, [id, rating_id]);

  const fetchAverageRating = useCallback(async () => {
    try {
      const { data } = await axiosReq.get(`/posts/${id}`);
      setAverageRating(data.average_rating);
    } catch (err) {
      console.log(err)
    }
  }, [id]);

  useEffect((averageRating) => {
    fetchRating();
    fetchAverageRating(averageRating);
  }, [fetchRating, fetchAverageRating, rating_id, id]);

  const updateRating = (newRating) => {
    setUserRating(newRating);
    fetchAverageRating();
  };

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`posts/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosReq.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosReq.delete(`/likes/${like_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`} className={styles.Link}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span className={styles.Updated}>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Card.Body className={styles.Video}>
        <YoutubeEmbed embedId={embed_id} />
      </Card.Body>
      <Card.Body>
        <Link to={`/posts/${id}`} className={styles.Link}>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
        </Link>
        {content && <Card.Text>{content}</Card.Text>}
        <Row>
          <Col>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own post!</Tooltip>}
              >
                <i className="far fa-heart" />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <i className={`fas fa-heart ${styles.Heart}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i className={`far fa-heart ${styles.HeartOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i className="far fa-heart" />
              </OverlayTrigger>
            )}
            {likes_count}
          </Col>
          <Col className={styles.RatingCol}>
            {currentUser ? (
              <Rating
              key={rating_id}
              post_id={id}
              setPosts={setPosts}
              updateRating={updateRating}
              userRating={userRating}
            />            
            ) : (
              <Link to="/login" className={styles.Link}>
                <p>Log in to rate this post!</p>
              </Link>              
            )}
            {averageRating ? (
              <i className={`fa fa-star ${styles.AvgRating}`} />              
            ) : (
              <p>No ratings yet!</p>
            )}
            {averageRating}
          </Col>
          <Col>
            <Link to={`/posts/${id}`}>
              <i className={`far fa-comments ${styles.Comment}`} />
            </Link>
            {comments_count}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Post;
