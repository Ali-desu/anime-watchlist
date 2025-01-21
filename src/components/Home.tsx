import { useEffect, useState } from 'react';
import videoWeb from '../assets/video4.mp4';
import '../styles/Home.css';
import { fetchTopAnime } from '../services/animeApi';
import AnimeCard from './AnimeCard';

const Hero = () => {
  const [topAnime, setTopAnime] = useState<{ mal_id: number; title: string; image_url: string; score: number }[]>([]);

  useEffect(() => {
    const getTopAnime = async () => {
      const data = await fetchTopAnime();
      setTopAnime(data);
    };
    getTopAnime();
  }, []);

  return (
    <div className="hero-section">
      <video autoPlay loop muted className="background-video">
        <source src={videoWeb} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        <div className="anime-container">
        <h2>Top Anime</h2>
        <div className="anime-list">
          {topAnime.map((anime) => ( console.log(anime),
            <AnimeCard key={anime.mal_id} imageUrl={anime.images.jpg.image_url} title={anime.title} rating={anime.score} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
