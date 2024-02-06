import React from "react";
import { Col, Row, Container, Form } from "react-bootstrap";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";

function PostsPage() {
  return (
    <Row className="h-100">
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        <p>List of posts here</p>
      </Col>
    </Row>
  );
}

export default PostsPage;
