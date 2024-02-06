import React, { useEffect, useState } from "react";
import { Col, Row, Container, Form } from "react-bootstrap";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setIsLoaded(false);
    fetchPosts();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {isLoaded ? (
          <>
            {posts.results.length ? (
              posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default PostsPage;
