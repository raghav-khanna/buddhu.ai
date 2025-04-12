import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const RootRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/home'); // Redirect to home if authenticated
    } else if (!isLoading && !isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isLoading, isAuthenticated, navigate]);

  // While the SDK is loading authentication status, show nothing or a loader
  if (isLoading) {
    return <Loader />; // Or return null, or a spinner component
  }

  return <></>;
};

export default RootRedirect;
