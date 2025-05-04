import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, CardMedia, Button, Box } from "@mui/material";

const CardDetails = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/cards/${id}`);
                setCard(response.data.card);
            } catch (error) {
                console.error("Error fetching card details:", error);
            }
        };
        fetchCard();
    }, [id]);

    if (!card) return <p>Loading...</p>;

    return (
        <div style={styles.container}>
            <Typography variant="h2" style={styles.heading}>
                {card.title}
            </Typography>
            <Card style={styles.card}>
                <CardMedia
                    component="img"
                    alt={card.title}
                    height="full"
                    image={card.imageLink}
                    style={styles.image}
                />
                <CardContent>
                    <Typography variant="h5">Description</Typography>
                    <Typography variant="body1" color="textSecondary">
                        {card.longDescription}
                    </Typography>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                    <Button variant="contained" color="primary" href="/">
                        Back to Home
                    </Button>
                </Box>
            </Card>
        </div>
    );
};

// Styles
const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
    },
    heading: {
        marginBottom: "50px",
        fontWeight: "bold",
    },
    card: {
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    image: {
        borderRadius: "8px",
        marginBottom: "40px",

    },
};

export default CardDetails;