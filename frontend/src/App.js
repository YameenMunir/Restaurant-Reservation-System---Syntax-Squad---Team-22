// src/App.js
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturedDishes from './components/FeaturedDishes/FeaturedDishes';
import Footer from './components/Footer/Footer';
import AgeliRobot from './components/AgeliRobot/AgeliRobot';

function App() {
    const [hasSeenIntro, setHasSeenIntro] = useState(false);

    useEffect(() => {
        const introSeen = localStorage.getItem('fogFlameIntroSeen');
        setHasSeenIntro(!!introSeen);
    }, []);

    const handleWatchIntroAgain = () => {
        localStorage.removeItem('fogFlameIntroSeen');
        window.location.reload();
    };

    return (
        <div className="bg-gray-100">
            {!hasSeenIntro && (
                <iframe
                    src="fog-flame-intro.html"
                    className="fixed top-0 left-0 w-full h-full border-none z-50"
                    title="Fog & Flame Intro"
                    onLoad={() => {
                        document.body.style.overflow = 'hidden';
                        setTimeout(() => {
                            const iframe = document.querySelector('iframe');
                            if (iframe) iframe.remove();
                            document.body.style.overflow = '';
                            localStorage.setItem('fogFlameIntroSeen', 'true');
                            setHasSeenIntro(true);
                        }, 8500);
                    }}
                />
            )}

            <Navbar />
            <HeroSection />
            <FeaturedDishes />
            <Footer />
            <AgeliRobot />
        </div>
    );
}

export default App;