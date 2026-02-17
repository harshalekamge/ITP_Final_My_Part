// src/components/Products/ProductForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductsView.css";



const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: ""
  });

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        const res = await axios.get(`http://localhost:5001/products/${id}`, { withCredentials: true });
        setFormData(res.data.product);
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5001/products/${id}`, formData, { withCredentials: true });
      } else {
        await axios.post("http://localhost:5001/products", formData, { withCredentials: true });
      }
      navigate("/products");
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  return (
    <div className="user-view-container">
      <h2>{isEdit ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

        <label>Image URL</label>
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

        <button type="submit">{isEdit ? "Update" : "Add"} Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
