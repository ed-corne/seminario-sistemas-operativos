import React from "react";

// children is used to render all the components that are insaded of the component card(where the component is rendered)
const Card = ({ children, width, height, direction }) => {
  // create a style object for the card to uses the properties thar are passed by the component
    const cardStyle = {
    background: "#6c8ba7",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    width: width || "100%",
    height: height || "200px",
    display: "flex",
    flexDirection: direction || "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return <div style={cardStyle}>{children}</div>;
};

export default Card;
