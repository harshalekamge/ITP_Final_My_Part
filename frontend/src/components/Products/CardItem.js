// src/components/Products/CardItem.js
import React from "react";
import "./CardItem.css"; // Import the CSS file

const CardItem = ({ card }) => {
  // Dynamically map product fields to expected props
  const title = card.name || card.title; // Use name for products, title for cards
  const imageLink = card.imageUrl || card.imageLink; // Use imageUrl for products, imageLink for cards
  const description = card.description || card.shortDescription;

  return (
    <div className="card-item">
      <img src={imageLink} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default CardItem;