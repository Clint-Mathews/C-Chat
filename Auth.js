import { useEffect, useContext, createContext, useState } from "react";
import { auth, db } from "./firebase";
import Login from "./pages/login";
import Loading from "./components/Loading";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        // console.log("No user");
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      const userData = {
        displayName: user.displayName,
        email: user.email,
        lastScene: serverTimestamp(),
        photoURL: user.photoURL,
      };
      await setDoc(doc(db, "users", user.uid), userData);
      setCurrentUser(user);
      setLoading(false);
      // console.log(token);
    });
  }, []);
  if (loading) {
    return <Loading type="spin" color="#08a1e4"></Loading>;
  }
  if (!currentUser) {
    return <Login />;
  }

  const updateName = (name) => {
    // console.log(name);
    if (currentUser) {
      const data = currentUser;
      data.displayName = name;
      setCurrentUser(data);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
