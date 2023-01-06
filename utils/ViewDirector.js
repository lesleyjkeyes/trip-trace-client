import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { userLoading } = useAuth();

  if (userLoading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
