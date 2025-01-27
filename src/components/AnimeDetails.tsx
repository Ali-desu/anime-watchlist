import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { fetchAnimeById } from '../services/animeApi';
import '../styles/AnimeDetails.css';

interface Anime {
  mal_id: number;
  images: {
    webp: {
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  episodes: number;
  status: string;
  aired: {
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  synopsis: string;
}

const AnimeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(true);

  // Check if anime is in favorites
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const user = auth.currentUser;
      if (!user || !id) {
        setLoadingFavorite(false);
        return;
      }

      try {
        const favoriteRef = doc(db, 'users', user.uid, 'favorites', id);
        const snapshot = await getDoc(favoriteRef);
        setIsFavorite(snapshot.exists());
      } catch (error) {
        console.error('Error checking favorite status:', error);
      } finally {
        setLoadingFavorite(false);
      }
    };

    checkFavoriteStatus();
  }, [id]);

  // Fetch anime details
  useEffect(() => {
    const getAnimeDetails = async () => {
      if (id) {
        try {
          const data = await fetchAnimeById(id);
          setAnime(data);
        } catch (error) {
          console.error('Error fetching anime details:', error);
        }
      }
    };
    getAnimeDetails();
  }, [id]);

  const handleFavorite = async () => {
    const user = auth.currentUser;
    if (!user || !anime) return;

    try {
      const favoriteRef = doc(db, 'users', user.uid, 'favorites', id || '');

      if (isFavorite) {
        await deleteDoc(favoriteRef);
        setIsFavorite(false);
      } else {
        await setDoc(favoriteRef, {
          mal_id: anime.mal_id,
          title: anime.title,
          image_url: anime.images.webp.large_image_url,
          addedAt: serverTimestamp(),
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
      alert('Error updating favorite status. Please try again.');
    }
  };

  if (!anime) {
    return <div>Loading anime details...</div>;
  }

  return (
    <section className="anime-details">
      <div className="img">
        <img src={anime.images.webp.large_image_url} alt={anime.title} />
      </div>
      <div className="details">
        <div className="buttons">
          <button 
            onClick={handleFavorite}
            disabled={loadingFavorite}
            className={isFavorite ? 'favorited' : ''}
          >
            {loadingFavorite ? 'Checking...' : 
             isFavorite ? '❤️ Remove from Favorites' : '♡ Add to Favorites'}
          </button>
          <button>+ Add to List</button>
        </div>
        <h1>{anime.title}</h1>
        <p><strong>English Title:</strong> {anime.title_english}</p>
        <p><strong>Japanese Title:</strong> {anime.title_japanese}</p>
        <p><strong>Type:</strong> {anime.type}</p>
        <p><strong>Episodes:</strong> {anime.episodes}</p>
        <p><strong>Status:</strong> {anime.status}</p>
        <p><strong>Aired:</strong> {anime.aired.string}</p>
        <p><strong>Duration:</strong> {anime.duration}</p>
        <p><strong>Rating:</strong> {anime.rating}</p>
        <p><strong>Score:</strong> {anime.score}</p>
        <p><strong>Synopsis:</strong> {anime.synopsis}</p>
      </div>
    </section>
  );
};

export default AnimeDetails;