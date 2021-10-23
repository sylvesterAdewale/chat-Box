import React, { useContext, useEffect, useState } from 'react';
import initApp from '../firebase'
import 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { signInWithPopup, GoogleAuthProvider, getAuth, signOut } from "firebase/auth";
import Loading from './Loading';


const AuthContext = React.createContext();

export function useDatas() {
    return useContext(AuthContext)
}

    
export function AuthProvider({ children }) {

        const [currentUser, setCurrentUser] = useState(null)
        const [error, setError] = useState('')
        const [inits, setInits] = useState(true)
        const [loading, setLoading] = useState(false)
        
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const db = getFirestore();
        
        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if(user) {
                    setCurrentUser(user);
                }else {
                    setCurrentUser(null)
                }
                if (inits) {
                    setInits(false)
                }
            });
            
            return unsubscribe;
        }, [])
        async function signInWithGoogle()  {
            auth.useDeviceLanguage()
            
            try {
                await signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    console.log(user)
                    setCurrentUser(user)
                    setError('')
                    // ...
                })
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError("There's an error")
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            }
        }
        
        function signout() {
            signOut(auth).then(() => {
                // Sign-out successful.
            }).catch((error) => {
                setError('Unable to sign out')
                // An error happened.
            });
        }
        // if (inits) return (setLoading(true))
        
        
            const value = {
                signInWithGoogle,
                signout,
                currentUser,
                error,
                loading,
                db
            }
        return (
            <AuthContext.Provider value={ value }>
            {inits && <Loading />}
            {!inits && children }
        </AuthContext.Provider>
    )
}
