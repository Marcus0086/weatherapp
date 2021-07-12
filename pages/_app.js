import { useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";
import Login from "./login";
import firebase from "firebase";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }, []);
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp
