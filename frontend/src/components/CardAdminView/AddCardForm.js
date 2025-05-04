import React, { useState } from "react";
import axios from "axios";
import "./AddCardForm.css"; // Import the CSS file

const AddCardForm = ({ setCards }) => {
    const [formData, setFormData] = useState({
        title: "",
        imageLink: "",
        shortDescription: "",
        longDescription: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/cards", formData);
            setCards((prevCards) => [...prevCards, response.data.card]);
            alert("Card added successfully!");
        } catch (error) {
            console.error("Error adding card:", error);
        }
    };

    const handleCancel = () => {
        // Redirect back to the home page or previous route
        window.location.href = "/";
    };

    return (
        <div className="container">
            <h2>Add New Card</h2>
            <form onSubmit={handleSubmit} className="form-container">
                {/* Title */}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter the title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Image URL */}
                <div className="form-group">
                    <label htmlFor="imageLink">Image URL</label>
                    <input
                        type="text"
                        id="imageLink"
                        name="imageLink"
                        placeholder="Enter the image URL"
                        value={formData.imageLink}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Short Description */}
                <div className="form-group">
                    <label htmlFor="shortDescription">Short Description</label>
                    <textarea
                        id="shortDescription"
                        name="shortDescription"
                        placeholder="Enter a short description"
                        value={formData.shortDescription}
                        onChange={handleChange}
                    />
                </div>

                {/* Long Description */}
                <div className="form-group">
                    <label htmlFor="longDescription">Long Description</label>
                    <textarea
                        id="longDescription"
                        name="longDescription"
                        placeholder="Enter a detailed description"
                        value={formData.longDescription}
                        onChange={handleChange}
                        
                    />
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button type="submit" className="submit-button">
                        Add Card
                    </button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCardForm;