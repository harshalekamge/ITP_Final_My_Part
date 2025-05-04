import React from "react";
import CardItem from "./CardItem"; // Reusable card component
import "./CardGrid.css"; // Import the CSS file

const CardGrid = ({ cards }) => {
  return (
    <div className="card-grid">
      <h2 className="section-title">Featured Cards</h2>
      <div className="grid-container">
        {cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;