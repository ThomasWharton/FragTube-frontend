import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
        try {
          const [{data: post}] = await Promise.all([
            await axiosReq.get(`/posts/${id}`)
          ])
          setPost({results: [post]})
          setIsLoaded(true)
        } catch(err) {
          console.log(err)
        }
    };

    handleMount()
  }, [id]);
  
  if (isLoaded) {
    return (
      <Row className="h-100">
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          Popular profiles for desktop
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <p>Popular profiles for mobile</p>
          <Post {...post.results[0]} setPosts={setPost} PostPage />
          <Container className={appStyles.Content}>Comments</Container>
        </Col>
        
      </Row>
    );
  }
  return <Asset spinner />;
  
}

export default PostPage;
