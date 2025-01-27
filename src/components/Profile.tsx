import React, { useState, useEffect } from 'react';
import { auth, db } from "../config/firebase";
import { doc, getDoc , collection ,getDocs} from "firebase/firestore";
import "../styles/Profile.css";
import img from '../assets/anime-default-pfp.jpg';


interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  gender: string;
  bio: string;
  profile_pic: string | null;
}

interface FavoriteAnime {
    id: string;
    title: string;
    image_url: string;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [favorites, setFavorites] = useState<FavoriteAnime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        }
      }
      setLoading(false);
    };

    const fetchFavoriteAnimes = async () => {
        const user = auth.currentUser;
        if (user) {
            const favoritesCol = collection(db, "users", user.uid, "favorites");
            const snapshot = await getDocs(favoritesCol);
            const favs = snapshot.docs.map(
                doc => ({ 
                    id : doc.id,
                    ...doc.data()
                    
                }));
            setFavorites(favs as FavoriteAnime[]);
        }
    }

    fetchUserProfile();
    fetchFavoriteAnimes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>No user profile found</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={userProfile.profile_pic || img} alt="Profile" className="profile-pic" />
        <h1>{userProfile.fullName}</h1>
        <p>{userProfile.email}</p>
      </div>
      <div className="profile-details">
        <h2>About Me</h2>
        <p><strong>Gender:</strong> {userProfile.gender}</p>
        <p><strong>Bio:</strong> {userProfile.bio}</p>
        <p><strong>Favorite Animes</strong>
            {
                favorites.map((favorite, index) => (
                    <div key={index}>
                        <img src={favorite.image_url} alt={favorite.title} />
                        <p>{favorite.title}</p>
                    </div>
                ))

            }
        </p>
      </div>
    </div>
  );
};

export default Profile;