import './App.css';

function App() {
    return (
        <div className="app-container">
            {/* Top Black Menu Bar */}
            <header className="top-menu">
                <h1 className="logo"> 🍽️ Fog & Flame</h1>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Reservations</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>

            {/* Content Section (Can Add More Later) */}
            <main className="content">
                <h2>Welcome to Fog & Flame</h2>
                <p>Reserve your table now for an unforgettable dining experience.</p>
                <button className="reserve-btn">Reserve a Table</button>
            </main>

            {/* Bottom Black Footer */}
            <footer className="bottom-menu">
                <p>© 2023. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
