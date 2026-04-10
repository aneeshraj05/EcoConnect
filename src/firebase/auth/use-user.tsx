
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '../provider';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

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
        try {
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
              // Create user profile in Firestore if it doesn't exist
              const { email, photoURL } = userAuth;
              const displayName = userAuth.displayName || (email ? email.split('@')[0] : 'New User');
              const userData = {
                displayName,
                email,
                photoURL,
              };
              setDoc(userRef, userData)
                .catch((e) => {
                  const permissionError = new FirestorePermissionError({
                    path: userRef.path,
                    operation: 'create',
                    requestResourceData: userData,
                  });
                  errorEmitter.emit('permission-error', permissionError);
                });
            }
        } catch (error) {
            const permissionError = new FirestorePermissionError({
                path: userRef.path,
                operation: 'get',
            });
            errorEmitter.emit('permission-error', permissionError);
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
