import React from "react";
import styles from "../../styles/Post.module.css";
import { Card, Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import YoutubeEmbed from "../../components/YoutubeEmbed";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    category,
    embed_id,
    content,
    updated_at,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return <Card className={styles.Post}>
    <Card.Body>
        <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`} className={styles.Link}>
                <Avatar src={profile_image} height={55} />
                {owner}
            </Link>
            <div className="d-flex align-items-center">
                <span>{updated_at}</span>
                {is_owner && postPage && "..."}
            </div>
        </Media>
    </Card.Body>
    <Card.Body className={styles.Video}>
      <YoutubeEmbed embedId={embed_id} />
    </Card.Body>
    <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
    </Card.Body>
  </Card>
};

export default Post;
