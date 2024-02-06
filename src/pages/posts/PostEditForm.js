import React, { useEffect, useState } from "react";

import styles from "../../styles/PostCreateEditForm.module.css";

import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router";

const PostEditForm = () => {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    category: "",
    embedId: "",
    content: "",
  });

  const { title, category, embedId, content } = postData;

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const embedId = data.embed_id;
        const { title, category, content, is_owner } = data;

        is_owner ? setPostData({ title, category, embedId, content }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("embed_id", embedId);
    formData.append("content", content);

    try {
      await axiosReq.put(`/posts/${id}`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Row>
      <Col className="my-auto mx-auto py-2 p-md-2" md={12}>
        <Container>
          <h1 className={styles.Header}>Edit Post</h1>

          <Row className={styles.Content}>
            <div className={styles.Info}>
              <h3>Information</h3>
              <p>
                The embed ID for creating a post is taken from the youtube url
                for the video you would like to include in your post.
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
              <h4 className={styles.Beware}>Beware!</h4>
              <p>
                If the video in question has been watched to a certain
                timestamp, the url may look different.
              </p>
              <p>
                https://www.youtube.com/watch?v=<strong>0F0xtWjLgHA</strong>
                &t=5s
              </p>
              <p>
                In the above example, there is some extra characters at the end
                of url to signify the timestamp.
              </p>
              <p>Be sure not to include the timestamp characters.</p>
            </div>

            <div>
              <Form
                onSubmit={handleSubmit}
                className={`${styles.Form} mx-auto`}
              >
                <Form.Group controlId="title">
                  <Form.Label className={styles.Label}>Title</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.title?.map((message, idx) => (
                  <Alert className={styles.Alert} varient="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="category">
                  <Form.Label className={styles.Label}>Game</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Game"
                    name="category"
                    value={category}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.category?.map((message, idx) => (
                  <Alert className={styles.Alert} varient="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="embedId">
                  <Form.Label className={styles.Label}>Embed ID</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Youtube embed ID"
                    name="embedId"
                    value={embedId}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.embed_id?.map((message, idx) => (
                  <Alert className={styles.Alert} varient="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="content">
                  <Form.Label className={styles.Label}>Content</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    as="textarea"
                    rows={6}
                    name="content"
                    value={content}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row>
                  <Button className={`${styles.Button} mx-auto`} type="submit">
                    Edit Post
                  </Button>
                  <Button
                    className={`${styles.Button} mx-auto`}
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                </Row>
              </Form>
            </div>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default PostEditForm;
