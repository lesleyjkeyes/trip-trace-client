/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import '../styles/globals.css';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <AuthProvider>
      <ViewDirectorBasedOnUserAuthStatus
        component={Component}
        pageProps={pageProps}
      />
    </AuthProvider>
  );
}

export default MyApp;
