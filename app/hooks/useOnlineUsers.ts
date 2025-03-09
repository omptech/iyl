import { useEffect, useState, useCallback } from 'react';
import { ref, onValue, set, onDisconnect, DatabaseReference, connectDatabaseEmulator } from 'firebase/database';
import { auth, database } from '../config/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

interface OnlineUser {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastSeen?: number;
}

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Update user status in Firebase
  const updateUserStatus = useCallback(async (userStatusRef: DatabaseReference, currentUser: User) => {
    const userData: OnlineUser = {
      id: currentUser.uid,
      name: currentUser.displayName || 'Anonymous User',
      status: 'online',
      lastSeen: Date.now(),
    };

    try {
      // First set the online status
      await set(userStatusRef, userData);
      console.log('Successfully updated user status to online');

      // Then set up disconnect hook
      await onDisconnect(userStatusRef).update({
        ...userData,
        status: 'offline',
        lastSeen: Date.now()
      });
      console.log('Successfully set up disconnect hook');

      setError(null);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error updating user status:', errorMessage);
      setError(`Failed to update status: ${errorMessage}`);
      return false;
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up auth state listener');
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser?.uid);
      setUser(currentUser);
      
      if (!currentUser) {
        setLoading(false);
        setError('Not authenticated');
        setOnlineUsers([]);
      }
    });

    return () => {
      console.log('Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  // Handle online users once auth is ready
  useEffect(() => {
    if (!user) {
      console.log('No user available, skipping online presence setup');
      return;
    }

    let mounted = true;
    console.log('Setting up online presence for user:', user.uid);
    
    const setupPresence = async () => {
      try {
        const usersRef = ref(database, 'users');
        const userStatusRef = ref(database, `users/${user.uid}`);

        // First set our status
        const statusUpdated = await updateUserStatus(userStatusRef, user);
        if (!statusUpdated) {
          console.error('Failed to update initial status');
          return;
        }

        // Then listen for other users
        const unsubscribe = onValue(usersRef, (snapshot) => {
          if (!mounted) return;

          try {
            const users: OnlineUser[] = [];
            snapshot.forEach((childSnapshot) => {
              const userData = childSnapshot.val() as OnlineUser;
              if (userData && userData.status === 'online') {
                users.push(userData);
              }
            });

            console.log(`Found ${users.length} online users:`, users.map(u => u.name));
            setOnlineUsers(users);
            setLoading(false);
            setError(null);
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.error('Error processing users data:', errorMessage);
            if (mounted) {
              setError(`Failed to process users: ${errorMessage}`);
              setLoading(false);
            }
          }
        }, (error) => {
          console.error('Error in online users listener:', error);
          if (mounted) {
            setError(`Database error: ${error.message}`);
            setLoading(false);
          }
        });

        return () => {
          mounted = false;
          unsubscribe();
          
          // Update status to offline when component unmounts
          set(userStatusRef, {
            id: user.uid,
            name: user.displayName || 'Anonymous User',
            status: 'offline',
            lastSeen: Date.now()
          }).catch((error) => {
            console.error('Error setting offline status:', error);
          });
        };
      } catch (error) {
        console.error('Error in presence setup:', error);
        if (mounted) {
          setError('Failed to setup presence');
          setLoading(false);
        }
      }
    };

    setupPresence();
  }, [user, updateUserStatus]);

  return { onlineUsers, loading, error };
}; 