import React from 'react'

import styles from "../../styles/Form.module.css";

import { Form, Button, Col, Row, Container } from "react-bootstrap";

const PostCreateForm = () => {
  return (
    <Row>
      <Col className="my-auto py-2 p-md-2" md={12}>
        <Container>
          <h1 className={styles.Header}>Create Post</h1>

          <Form className={`${styles.Form} mx-auto`}>
            <Form.Group controlId="title">
              <Form.Label className="d-none">Title</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Title"
                name="title"
              />
            </Form.Group>

            <Form.Group controlId="embedId">
              <Form.Label className="d-none">Embed ID</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Youtube embed ID"
                name="embedId"
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label className="d-none">Content</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Content"
                name="content"
              />
            </Form.Group>

            <Button className={`${styles.Button} mx-auto`} type="submit">
              Create Post
            </Button>
            
          </Form>
        </Container>
      </Col>
    </Row>
  )
}

export default PostCreateForm