import React from 'react'
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from '../../styles/Comment.module.css'
import Avatar from '../../components/Avatar';

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content
  } = props;

  return (
    <>
        <hr />
        <Media>
            <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} />
            </Link>
            <Media.Body className="align-self-center ml-2">
                <span className={styles.Owner}>{owner}</span>
                <span className={styles.Date}>{updated_at}</span>
                <p>{content}</p>
            </Media.Body>
        </Media>
    </>
  )
}

export default Comment