import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditCardForm = ({ setCards }) => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        imageLink: "",
        shortDescription: "",
        longDescription: "",
    });

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/cards/${id}`);
                setFormData(response.data.card);
            } catch (error) {
                console.error("Error fetching card:", error);
            }
        };
        fetchCard();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5001/cards/${id}`, formData, { withCredentials: true });
            setCards((prevCards) =>
                prevCards.map((card) => (card._id === id ? { ...card, ...formData } : card))
            );
            alert("Card updated successfully!");
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };

    const handleCancel = () => {
        // Redirect back to the previous page
        window.history.back(); // Navigate back to the previous route
    };

    return (
        <div className="container">
            <h2>Edit Card</h2>
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
                        required
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
                        required
                    />
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button type="submit" className="submit-button">
                        Update Card
                    </button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCardForm;
