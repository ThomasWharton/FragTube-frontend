import React from "react";

import styles from "../../styles/PostCreateForm.module.css";

import { Form, Button, Col, Row, Container } from "react-bootstrap";

const PostCreateForm = () => {
  return (
    <Row>
      <Col className="my-auto mx-auto py-2 p-md-2" md={12}>
        <Container>
          <h1 className={styles.Header}>Create Post</h1>

          <Row className={styles.Content}>

          <div className={styles.Info}>
            <h3>Information</h3>
            <p>
              The embed ID for creating a post is taken from the youtube url for
              the video you would like to include in your post.
            </p>
            <p>
              It will be an 11 character long string at at the end of the URL.
            </p>
            <h4>Example:</h4>
            <p>
              https://www.youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>
            </p>
            <p>
              Embed Id for this example would be <strong>dQw4w9WgXcQ</strong>
            </p>
          </div>

          <div>
            <Form className={`${styles.Form} mx-auto`}>
              <Form.Group controlId="title">
                <Form.Label className={styles.Label}>Title</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Title"
                  name="title"
                />
              </Form.Group>

              <Form.Group controlId="embedId">
                <Form.Label className={styles.Label}>Embed ID</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Youtube embed ID"
                  name="embedId"
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label className={styles.Label}>Content</Form.Label>
                <Form.Control
                  className={styles.Input}
                  as="textarea"
                  rows={6}
                  name="content"
                />
              </Form.Group>

              <Button className={`${styles.Button} mx-auto`} type="submit">
                Create Post
              </Button>
            </Form>
          </div>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default PostCreateForm;
