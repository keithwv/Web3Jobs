import React, { useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase"
// import { doc, setDoc } from "firebase/firestore";


const AuthContext = React.createContext();


export function useAuth() {
    return useContext(AuthContext);
  }

  export function AuthProvider(props) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const register = async (firstName, lastName, email, password) => {
    //   try {
    //     const userCred = await createUserWithEmailAndPassword(
    //       auth,
    //       email,
    //       password
    //     );
    //     if (userCred.user) {
    //       let docRef = doc(db, `users/${userCred.user.uid}`);
    //       await setDoc(docRef, {
    //         name: firstName,
    //         last_name: lastName,
    //         email: email,
    //         uid: userCred.user.uid,
    //       });
    //     }
    //     console.log(userCred.user);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };

    const loginFirebase = async (loginEmail, loginPassword) => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      };
    
      const logout = async () => {
        try {
          const user = await signOut(auth);
          console.log(user);
          return user;
        } catch (error) {
          console.log(error.message);
          alert("Error!");
        }
      };
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
          console.log("Current User Changed");
        });
        return unsubscribe;
      }, []);

      const value = {
        currentUser,
        loginFirebase,
        logout,
      };
    
      if (loading) {
        return "LOADING";
      }
    
      return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
      );
    }
