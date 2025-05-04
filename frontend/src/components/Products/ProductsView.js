import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductsView.css"; // Import the CSS file
import CardItem from "./CardItem"; // Reusable card component

const UserView = () => {
  const [cards, setCards] = useState([]); // State to store fetched cards
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch card data from the backend
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("http://localhost:5001/cards");
        setCards(response.data.Cards); // Update state with fetched cards
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching cards:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div className="user-view-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Explore Our Products</h1>
        <p className="hero-subtitle">Discover unique products curated for you.</p>
        <img src="/images/20250326_170110.jpg" alt="Hero Image" className="hero-image" />
        </div>

      {/* Card Grid */}
      <div className="card-grid">
        <h2 className="section-title">Featured Products</h2>
        <div className="grid-container">
          {cards.map((card) => (
            <CardItem key={card._id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserView;