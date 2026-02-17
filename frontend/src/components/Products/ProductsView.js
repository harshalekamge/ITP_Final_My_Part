// src/components/Products/ProductsView.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // For navigation
import "./ProductsView.css";
import CardItem from "./CardItem";
import { useAuth } from "../../context/AuthContext";

const ProductsView = () => {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/products");
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5001/products/${id}`, { withCredentials: true });
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="user-view-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Explore Our Products</h1>
        <p className="hero-subtitle">Discover unique products curated for you.</p>
        <img src="/images/20250326_170110.jpg" alt="Hero Image" className="hero-image" />
      </div>

      {/* Add Product Button */}
      {isAdmin ? (
        <div className="actions">
          <Link to="/admin/products/new" className="btn btn-add">+  Add New Product</Link>
        </div>
      ) : null}

      {/* Product Grid */}
      <div className="card-grid">
        <h2 className="section-title">Featured Products</h2>
        <div className="grid-container">
          {products.map((product) => (
            <div key={product._id} className="card-wrapper">
              <CardItem card={product} />

              {/* Actions Bar */}
              <div className="card-actions">
                <Link to={`/products/${product._id}`} className="action-link">VIEW</Link>
                {isAdmin ? (
                  <>
                    <Link to={`/admin/products/${product._id}/edit`} className="action-link action-edit">EDIT</Link>
                    <button onClick={() => handleDelete(product._id)} className="action-link action-delete">DELETE</button>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
