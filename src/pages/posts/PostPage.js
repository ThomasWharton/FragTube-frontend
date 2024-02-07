import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [postComments, setPostComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: postComments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setPostComments((prevComments) => ({
          ...prevComments,
          [id]: postComments,
        }));
        setIsLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  if (isLoaded) {
    return (
      <Row className="h-100">
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <PopularProfiles mobile />
          <Post {...post.results[0]} setPosts={setPost} postPage />
          <Container className={appStyles.Content}>
            {currentUser ? (
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                post={id}
                setPost={setPost}
                setComments={setPostComments}
              />
            ) : postComments.results.length ? (
              "Comments"
            ) : null}
            {postComments.results.length ? (
              <InfiniteScroll
                children={postComments.results.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setPost={setPost}
                    setComments={setPostComments}
                  />
                ))}
                dataLength={postComments.results.length}
                loader={<Asset spinner />}
                hasMore={!!postComments[id].next}
                next={() => fetchMoreData(postComments[id], setPostComments)}
              />
            ) : currentUser ? (
              <span>No comments yet, be the first to comment!</span>
            ) : (
              <span>No comments... yet</span>
            )}
          </Container>
        </Col>
      </Row>
    );
  }
  return <Asset spinner />;
}

export default PostPage;
