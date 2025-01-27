import React, { useState, useCallback } from 'react';
import { fetchAnimeByName } from '../services/animeApi';
import { debounce } from '../utils/debounce';
import '../styles/SearchBar.css';
import AnimeCard from './AnimeCard';

const SearchBar: React.FC = () => {

    
    interface Anime {
        mal_id: number;
        title: string;
        images: {
            jpg: {
                image_url: string;
            };
        };
    }
    
    
    const [searchQuery, setSearchQuery] = useState('');
      const [searchResults, setSearchResults] = useState<Anime[]>([]);
      const [isSearching, setIsSearching] = useState(false);
        let ResultsCopy: Anime[] = [];

    const handleSearch = async (query: string) => {
      if (query.trim() === '') return; // Avoid empty searches

      try {
        const results = await fetchAnimeByName(query); // Fetch anime by search query
        setSearchResults(results); // Update the state with the search results
        ResultsCopy = searchResults;
        //console.log(ResultsCopy);
        
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

   

    const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);
      debouncedSearch(query);
      setIsSearching(true);
    };

    const displayAll = () => {
      setIsSearching(false);
      console.log(searchResults);
    }
    

    return (
      <>
      <div className="search-bar">
        {/* Search input */}
        <div className="search-input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for an anime..."
          className="search-input"
        />
        <button className="search-btn" onClick={displayAll} >Search</button>
        </div>


        {/* Render search results */}
        <div className="search-results">
          {isSearching && searchResults.map((anime) => (
             <AnimeCard
             key={anime.mal_id}
             id={anime.mal_id.toString()}
             imageUrl={anime.images.jpg.image_url}
             title={anime.title}
             rating={anime.score}
             className="search-card"
         />
          )).slice(0,5)}
        </div>
      </div>


      <div className="all-results">
        {!isSearching && searchResults.map((anime) => (
             <AnimeCard
             key={anime.mal_id}
             id={anime.mal_id.toString()}
             imageUrl={anime.images.jpg.image_url}
             title={anime.title}
             rating={anime.score}
             className="search-card"
         />
          ))}
        </div>
      </>
    );
};  

export default SearchBar;