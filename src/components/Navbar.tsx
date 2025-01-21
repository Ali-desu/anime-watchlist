import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import '../styles//Navbar.css'; 

const Navbar: React.FC = () => {
    return (
        <Router>
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">kurosaw</Link>
                </div>
                <ul className="navbar-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Catalog</Link>
                    </li>
                    <li>
                        <Link to="/">News</Link>
                    </li>
                    <li>
                        <Link to="/">Collections</Link>
                    </li>
                </ul>
                <div className="search-wrapper">
                    <input type="text" placeholder="Search" className="navbar-search" />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="sign">
                    <button className="sign-in">Login</button>
                    <button className="sign-up">Get Started</button>
                </div>
            </nav>
        </Router>
    );
};

export default Navbar;