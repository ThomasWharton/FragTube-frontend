import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "../../styles/RegisterLogInForm.module.css";

import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const LogInForm = () => {
  const setCurrentUser = useSetCurrentUser();

  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = logInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", logInData);
      setCurrentUser(data.user);
      history.push('/');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  
  const handleChange = async (event) => {
    setLogInData({
      ...logInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row>
      <Col className="my-auto py-2 p-md-2" md={12}>
        <Container>
          <h1 className={styles.Header}>Log in</h1>

          <Form className={`${styles.Form} mx-auto`} onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert className={styles.Alert} varient="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert className={styles.Alert} varient="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button className={`${styles.Button} mx-auto`} type="submit">
              Log In
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert className={styles.Alert} varient="warning" key={idx}>
                {message}
              </Alert>
            ))}
            
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default LogInForm;
