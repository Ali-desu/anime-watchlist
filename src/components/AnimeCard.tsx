import React from 'react';
import '../styles/AnimeCard.css';
import { Link } from 'react-router-dom';

interface AnimeCardProps {
  id: string;
  imageUrl: string;
  title: string;
  rating: number;
  className: string;
}

const AnimeCard: React.FC<AnimeCardProps> = ({id, imageUrl, title, rating , className="" }) => {
  return (
    <Link to={`/anime/${id}`} >
    <div className={`anime-card ${className}`}>
      <img src={imageUrl} alt={title} className="anime-card-image" />
      <div className="anime-card-content">
        <p className="anime-card-title">{title}</p>
        <p className="anime-card-rating">Rating: {rating}</p>
      </div>
    </div>
    </Link>
  );
};

export default AnimeCard;
