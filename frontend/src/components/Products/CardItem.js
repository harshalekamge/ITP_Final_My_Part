import React from "react";
import "./CardItem.css"; // Import the CSS file

const CardItem = ({ card }) => {
  return (
    <div className="card-item">
      <img src={card.imageLink} alt={card.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{card.title}</h3>
        <p className="card-description">{card.shortDescription}</p>
      </div>
    </div>
  );
};

export default CardItem;