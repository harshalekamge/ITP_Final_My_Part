import React from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, CardMedia, Button } from "@mui/material";

const CardListMini = ({ cards }) => {
    return (
        <div style={styles.container}>
            {/* Heading <Typography variant="h3" style={styles.heading}>
                All Cards - - - - - This is user side UI
            </Typography>*/}
            

            {/* Admin View Button */}
            <div style={styles.buttonGroup}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="secondary">
                        Admin View
                    </Button>
                </Link>
            </div>

            {/* Card Grid */}
            <Grid container spacing={4} justifyContent="center">
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <Grid item xs={12} sm={6} md={4} key={card._id}>
                            <Card style={styles.card}>
                                {/* Card Image */}
                                <CardMedia
                                    component="img"
                                    alt={card.title}
                                    height="auto"
                                    image={card.imageLink}
                                />
                                {/* Card Content */}
                                <CardContent>
                                    <Typography variant="h5">{card.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {card.shortDescription}
                                    </Typography>
                                </CardContent>
                                {/* View Details Button */}
                                <div style={styles.cardActions}>
                                    <Link to={`/card/${card._id}`} style={{ textDecoration: "none" }}>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" style={{ textAlign: "center", width: "100%" }}>
                        No cards available.
                    </Typography>
                )}
            </Grid>
        </div>
    );
};


//Styles
const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
        height: "auto",
        
    },
    heading: {
        fontSize: "2.5rem",
        marginTop: "70px",
        fontWeight: "bold",
        padding: "20px",
    },
    buttonGroup: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "70px",
    },
    card: {
        maxWidth: "345px",
        margin: "0 auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        height: "auto",

    },
    cardActions: {
        display: "flex",
        justifyContent: "center",
        padding: "10px",

    },
};


export default CardListMini;
/*
// Styles
const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
    },
    heading: {
        fontSize: "2.5rem",
        marginTop: "10px",
        fontWeight: "bold",
        padding: "100px",
    },
    card: {
        maxWidth: "345px",
        margin: "0 auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
};

export default CardListMini;*/