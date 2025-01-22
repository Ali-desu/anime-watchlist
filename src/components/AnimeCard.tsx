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
      <div className="anime-card-content">
        <p className="anime-card-title">{title}</p>
        <p className="anime-card-rating">Rating: {rating}</p>
      </div>
      <img src={imageUrl} alt={title} className="anime-card-image" />
    </div>
  );
};

export default AnimeCard;
