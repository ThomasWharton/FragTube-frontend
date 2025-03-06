import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/YoutubeEmbed.module.css"

// This component was taken from https://dev.to/bravemaster619/simplest-way-to-embed-a-youtube-video-in-your-react-app-3bk2

const YoutubeEmbed = ({ embedId, title }) => (
  
  <div className={styles.VideoResponsive}>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={title}
      referrerPolicy="no-referrer"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;