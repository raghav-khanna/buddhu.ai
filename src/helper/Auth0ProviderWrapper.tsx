import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Auth0ProviderWrapper = ({ children }: Props) => {
  const domain = 'dev-yatqtoku5j6bzgzm.us.auth0.com';
  const clientId = 'qBNrc8x4ZhAoooK0RztYkE1MuRm91X67';
  return (
    <>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: 'https://127.0.0.1:5173/' }}>
        {children}
      </Auth0Provider>
    </>
  );
};

export default Auth0ProviderWrapper;
