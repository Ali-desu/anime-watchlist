import React , {useEffect , useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {auth} from './config/firebase';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import AnimeDetails from './components/AnimeDetails';
import SearchPage from './components/SearchPage';
import Lists from './components/Lists';
import SignIn from './components/SignIn';
import Profile from './components/Profile';


interface User {
  uid: string;
  email: string;
  displayName?: string;
}


const App: React.FC = () => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || undefined,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/lists" element={<Lists />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
};

export default App;