import { createUserWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import { auth, db, googleProvider } from "../config/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import "../styles/SignIn.css";
import googleLogo from "../assets/google-logo.png";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("male");

    const createUserDocument = async (user: User, additionalData?: { gender?: string }) => {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {
            try {
                await setDoc(userRef, {
                    uid: user.uid,
                    fullName: user.displayName || name,
                    email: user.email,
                    profile_pic: user.photoURL || "",
                    bio: "",
                    gender: additionalData?.gender || "prefer-not-to-say",
                    createdAt: serverTimestamp(),
                    lastLogin: serverTimestamp()
                });
            } catch (error) {
                console.error("Error creating user document:", error);
            }
        } else {
            // Update last login time for existing users
            await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await createUserDocument(userCredential.user, { gender });
            console.log("User signed in:", userCredential.user);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            await createUserDocument(userCredential.user);
            console.log("User signed in with Google:", userCredential.user);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <div className="signIn">
            <h1>Sign Up</h1>
            <form onSubmit={handleEmailSignIn}>
                <label htmlFor="name">Display Name</label>
                <input
                    type="text"
                    id="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="gender">Gender</label>
                <select
                    id="gender"
                    required
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                </select>

                <button type="submit">Create Account</button>
                
                <div className="oauth-section">
                    <p className="or-divider">OR</p>
                    <button
                        type="button"
                        className="google-signin-btn"
                        onClick={handleGoogleSignIn}
                    >
                        <img src={googleLogo} alt="Google logo" className="google-logo" />
                        Continue with Google
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;