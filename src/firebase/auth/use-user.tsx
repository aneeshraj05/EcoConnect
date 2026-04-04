'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '../provider';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useFirestore } from '../provider';

export const useUser = () => {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth || !firestore) {
      // Firebase might not be initialized yet, or user is on a page without Firebase provider
      if (auth === null) setIsLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        // User is signed in
        const userRef = doc(firestore, `users/${userAuth.uid}`);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          // Create user profile in Firestore if it doesn't exist
          const { displayName, email, photoURL } = userAuth;
          try {
            await setDoc(userRef, {
              displayName,
              email,
              photoURL,
            });
          } catch(e) {
            console.error("Failed to create user document", e)
          }
        }
        setUser(userAuth);
      } else {
        // User is signed out
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  return { user, isLoading };
};
