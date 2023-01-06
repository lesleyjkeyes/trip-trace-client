import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { addUser, getUser } from '../../.husky/api/userData';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        await getUser(fbUser.uid).then(async (response) => {
          if (!response) {
            const userCreate = {
              uid: fbUser.uid,
              userName: fbUser.displayName,
              userImage: fbUser.photoURL,
            };
            await addUser(userCreate).then(() => setUser(fbUser));
          } else {
            setUser(fbUser);
          }
        });
      } else {
        setUser(false);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null,
    }),
    [user],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
