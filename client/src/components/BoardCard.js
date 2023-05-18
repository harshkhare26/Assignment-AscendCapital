import React from "react";
import { useHistory } from "react-router-dom";

const BoardThumbnail = (props) => {
  const history = useHistory();
  const { title, id } = props;

  const handleBoardClick = (e) => {
    history.push({
      pathname: `/board/${id}`,
    });
  };

  return (
    <div style={styles.thumbnail} onClick={handleBoardClick}>
      <div style={styles.title}>{title}</div>
    </div>
  );
};

const styles = {
  thumbnail: {
    height: "280px",
    width: "280px",
    background: "#eff590",
    padding: "10px",
    margin: "25px",
    marginBotton: "80px",
    marginTop: "80px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "3px",
    boxShadow: "0 2px 4px grey",
  },
  title: {
    color: "black",
    fontFamily: "chalkduster",
    fontSize: "30px",
  },
};

export default BoardThumbnail;
