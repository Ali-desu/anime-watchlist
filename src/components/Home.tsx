import { useEffect, useState } from 'react';
import videoWeb from '../assets/video4.mp4';
import '../styles/Home.css';
import {fetchTrendingAnime} from '../services/animeApi';
import Carousel from './carousel'; // Importing the Carousel component
import SearchBar from './SearchBar';

const Hero = () => {
  const [trendingAnime, setTrendingAnime] = useState<{ mal_id: number; title: string; image_url: string; score: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ trendingData] = await Promise.all([fetchTrendingAnime()]);
        setTrendingAnime(trendingData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  

  return (
    <>    
      <div className="hero-section">
        <div className="hero-content">
        <h2 className="hero-title">Welcome to <span>Kurosaw</span></h2>
        <p className="hero-subtitle">Explore. Engage. Track Your Favorite Anime Adventures.</p>

        </div>
        <video autoPlay loop muted className="background-video">
          <source src={videoWeb} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div>
        <div className="anime-container">
          <h2>Popular Animes</h2>
          <Carousel topAnime={trendingAnime} /> {/* Integrating the Carousel component */}
        </div>
      </div>

    </>
  );
};

export default Hero;
