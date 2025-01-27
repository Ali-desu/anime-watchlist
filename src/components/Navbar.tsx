import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../config/firebase";
import '../styles/Navbar.css';

interface User {
  uid: string;
  email: string;
  displayName?: string;
}

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">kurosaw</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/catalog">Catalog</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/lists">My Collection</Link>
        </li>
      </ul>
      <div className="sign">
        {user ? (
          <>
            <Link to="/profile" className="profile-button">Profile</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin" className="sign-in-button">Sign In</Link>
            <Link to="/signup" className="sign-up-button">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;