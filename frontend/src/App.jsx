// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';
import './styles/animations.css';
import './styles/ageli.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import { AgeliProvider } from './context/AgeliContext';

function App() {
    // Check if user has seen the intro
    useEffect(() => {
        const hasSeenIntro = localStorage.getItem('fogFlameIntroSeen');

        if (!hasSeenIntro) {
            // Handle intro animation
            const showIntro = async () => {
                // You'd implement an intro component here
                document.body.style.overflow = 'hidden';

                // Set timeout to end intro
                setTimeout(() => {
                    document.body.style.overflow = '';
                    localStorage.setItem('fogFlameIntroSeen', 'true');
                }, 8500);
            };

            showIntro();
        }
    }, []);

    return (
        <AgeliProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/reservations" element={<ReservationPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Layout>
        </AgeliProvider>
    );
}

export default App;

// src/context/AgeliContext.js
import React, { createContext, useState, useContext } from 'react';

const AgeliContext = createContext();

export const useAgeli = () => useContext(AgeliContext);

export const AgeliProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm Ageli, your personal Fog & Flame assistant. How may I be of service today?", isBot: true }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const addMessage = (message, isBot = false) => {
        setMessages(prev => [...prev, {
            id: prev.length + 1,
            text: message,
            isBot
        }]);
    };

    const handleBotResponse = (userMessage) => {
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            setIsTyping(false);

            // Generate response based on user message
            let botResponse;
            const lowerCaseMessage = userMessage.toLowerCase();

            if (lowerCaseMessage.includes('hour') || lowerCaseMessage.includes('open')) {
                botResponse = "Fog & Flame is open Tuesday to Sunday from 11:00 AM to 10:00 PM. We're closed on Mondays for maintenance and preparation.";
            } else if (lowerCaseMessage.includes('reservation') || lowerCaseMessage.includes('book') || lowerCaseMessage.includes('table')) {
                botResponse = "I'd be delighted to help with a reservation. You can book through our website's reservation page, or by calling us at (555) 123-4567. Weekend bookings should ideally be made 48 hours in advance.";
            } else if (lowerCaseMessage.includes('menu') || lowerCaseMessage.includes('food') || lowerCaseMessage.includes('dish')) {
                botResponse = "The Fog & Flame menu features an exquisite fusion of international cuisines prepared with locally-sourced ingredients. Our renowned chef's specialties include our signature Gourmet Pasta, artisanal Sushi selection, and award-winning desserts.";
            } else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('address') || lowerCaseMessage.includes('where')) {
                botResponse = "Fog & Flame is located at 123 Borough High Street, Gourmet District, London SE1. We're conveniently situated just a 5-minute walk from London Bridge Station.";
            } else {
                botResponse = "It's my pleasure to assist you with your inquiry about Fog & Flame. Is there something specific about our menu, reservations, special events, or location that I can help clarify for you?";
            }

            addMessage(botResponse, true);
        }, 1500);
    };

    return (
        <AgeliContext.Provider value={{
            isOpen,
            messages,
            isTyping,
            toggleChat,
            addMessage,
            handleBotResponse
        }}>
            {children}
        </AgeliContext.Provider>
    );
};