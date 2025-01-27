export const fetchAnimeList = async () => {
  try {
    const response = await fetch('https://api.jikan.moe/v4/anime');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export const fetchAnimeByName = async (name: string) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${name}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export const fetchAnimeByCategory = async (category: string) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?category=${category}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export const fetchTopAnime = async () => {
  try {
    const response = await fetch('https://api.jikan.moe/v4/top/anime');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}


export const fetchTrendingAnime = async () => {
  try {
    const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export const fetchAnimeById = async (id: string) => {
  try{
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const data = await response.json();
    return data.data; 
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
      }
}
