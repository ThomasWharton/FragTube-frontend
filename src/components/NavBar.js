import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleLogOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const createPostIcon = (
    <NavLink
      to="/posts/create"
      className={styles.Link}
      activeClassName={styles.Active}
    >
      <i className="fas fa-plus-square"></i> Create Post
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        to="/feed"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i className="fas fa-stream"></i> Feed
      </NavLink>
      <NavLink
        to="/liked"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i className="fas fa-heart"></i> Liked
      </NavLink>
      <NavLink to="/" className={styles.Link} onClick={handleLogOut}>
        <i className="fas fa-sign-out-alt"></i> Log Out
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.Link}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        to="/login"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i className="fas fa-sign-in-alt"></i> Log in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="lg"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand className={styles.Logo}>
            Frag<i className="fas fa-rocket"></i>Tube
          </Navbar.Brand>
        </NavLink>
        {currentUser && createPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink
              exact
              to="/"
              className={styles.Link}
              activeClassName={styles.Active}
            >
              <i className="fas fa-home"></i> Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
