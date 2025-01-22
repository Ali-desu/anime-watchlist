import { useEffect, useState } from 'react';
import videoWeb from '../assets/video4.mp4';
import '../styles/Home.css';
import { fetchTopAnime } from '../services/animeApi';
import AnimeCard from './AnimeCard';
import Carousel from './carousel'; // Importing the Carousel component

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
    <>    
      <div className="hero-section">
        <div className="hero-content">
          <h2>welcome to Kurosaw</h2>
          <p>Discover, Discuss And Keep Track Of Your Animes</p>
        </div>
        <video autoPlay loop muted className="background-video">
          <source src={videoWeb} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div>
        <div className="anime-container">
          <h2>Top Anime</h2>
          <Carousel topAnime={topAnime} /> {/* Integrating the Carousel component */}
        </div>
      </div>
    </>
  );
};

export default Hero;
