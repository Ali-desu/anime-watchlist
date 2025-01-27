import React, { useState } from 'react';
import '../styles/Carousel.css'; // Importing CSS for styling
import AnimeCard from './AnimeCard';

interface Anime {
    mal_id: number;
    title: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
    score: number;
}

interface CarouselProps {
    topAnime: Anime[];
}

const Carousel: React.FC<CarouselProps> = ({ topAnime }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    //console.log(currentIndex);
    
    function NextElm(){
        if(currentIndex < 9){
            setCurrentIndex(currentIndex + 1);
        }
    }

    function PrevElm(){
        if(currentIndex > 0){
            setCurrentIndex(currentIndex - 1);
        }
    }
    

    return (
        <div className="carousel">
           
            <div className="carousel-container">
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(-${currentIndex * 10}%)`
                    }}
                >
                    {topAnime.map((anime) => (
                        <div className="carousel-item" key={anime.mal_id}>
                            <AnimeCard
                                key={anime.mal_id}
                                id={anime.mal_id.toString()}
                                imageUrl={anime.images.jpg.image_url}
                                title={anime.title}
                                rating={anime.score}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="buttons">
                <button className="next-button" onClick={NextElm}>
                    &#8250;
                </button>
                <button className="prev-button" onClick={PrevElm} >
                    &#8249;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
