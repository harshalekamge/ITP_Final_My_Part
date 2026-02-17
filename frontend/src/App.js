// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import AddCardForm from "./components/CardAdminView/AddCardForm";
import EditCardForm from "./components/CardAdminView/EditCardForm";
import CardDetails from "./components/CardAdminView/CardDetails";
import CardListMini from "./components/CardAdminView/CardListMini";
import UserView from "./components/Products/ProductsView";      
import Header from "./components/Header/Header"; // Import the new Header component
import Footer from "./components/Footer/Footer"; // Import the Footer component
import MarketingPage from './components/marketing-page/MarketingPage'; // Import the MarketingPage component
import ProductsView from "./components/Products/ProductsView"; // Import ProductsView
import ProductDetails from "./components/Products/ProductDetails"; // Import ProductDetails
import ProductForm from "./components/Products/ProductForm"; // Import ProductForm
import './App.css';

import PlasticProductSelector from './components/PlasticProductSelector/PlasticProductSelector';
import RecycleCentersPage from "./components/RecycleCenters/RecycleCentersPage";
import EcoFootprintCalculator from "./components/EcoFootprint/EcoFootprintCalculator";
import LoginPage from "./components/Auth/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
    const [cards, setCards] = useState([]);

    // Fetch all cards on app load
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get("http://localhost:5001/cards");
                setCards(response.data.Cards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };
        fetchCards();
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="content">
                    <Routes>
                        <Route path="/" element={<MarketingPage />} />
                        <Route path="/knowledge-hub" element={<CardListMini cards={cards} />} />
                        <Route path="/admin/knowledge-hub" element={<Navigate to="/knowledge-hub" replace />} />
                        <Route
                          path="/admin/panel"
                          element={
                            <ProtectedRoute adminOnly>
                              <div style={{ padding: "2rem", textAlign: "center" }}>
                                This is admin panel.
                              </div>
                            </ProtectedRoute>
                          }
                        />
                        <Route path="/uuserview" element={<Navigate to="/" replace />} />
                        <Route
                          path="/add"
                          element={
                            <ProtectedRoute adminOnly>
                              <AddCardForm setCards={setCards} />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/edit/:id"
                          element={
                            <ProtectedRoute adminOnly>
                              <EditCardForm setCards={setCards} />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/cards/new"
                          element={
                            <ProtectedRoute adminOnly>
                              <AddCardForm setCards={setCards} />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/cards/:id/edit"
                          element={
                            <ProtectedRoute adminOnly>
                              <EditCardForm setCards={setCards} />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="/card/:id" element={<CardDetails />} />
                        <Route path="/user-view" element={<CardListMini cards={cards} />} />
                        <Route path="/userview" element={<UserView />} />
                        <Route path="/products" element={<ProductsView />} />
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route
                          path="/products/new"
                          element={
                            <ProtectedRoute adminOnly>
                              <ProductForm />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/products/:id/edit"
                          element={
                            <ProtectedRoute adminOnly>
                              <ProductForm />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/products/new"
                          element={
                            <ProtectedRoute adminOnly>
                              <ProductForm />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/products/:id/edit"
                          element={
                            <ProtectedRoute adminOnly>
                              <ProductForm />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
                        <Route path="/admin/login" element={<LoginPage />} />
                        {/* Add new route for the PlasticProductSelector */}
                        <Route path="/plastic-info" element={<PlasticProductSelector />} />
                        <Route path="/recycle-centers" element={<RecycleCentersPage />} />
                        <Route path="/eco-footprint" element={<EcoFootprintCalculator />} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
}

// ScrollToTop Component
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to the top of the page whenever the route changes
        window.scrollTo(0, 0);
    }, [pathname]);

    return null; // This component does not render anything
}

export default App;
