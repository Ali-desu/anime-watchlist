import React from 'react';
import '../styles/AnimeCard.css';

interface AnimeCardProps {
  imageUrl: string;
  title: string;
  rating: number;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ imageUrl, title, rating }) => {
  return (
    <div className="anime-card">
      <img src={imageUrl} alt={title} className="anime-card-image" />
      <div className="anime-card-content">
        <h3 className="anime-card-title">{title}</h3>
        <p className="anime-card-rating">Rating: {rating}</p>
      </div>
    </div>
  );
};

export default AnimeCard;
