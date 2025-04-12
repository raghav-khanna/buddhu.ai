import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <>
      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="bg-card-content  p-2 rounded-lg text-text font-bold hover:cursor-pointer shadow-md hover:shadow-accessible-green hover:bg-accessible-green-dark transition-all duration-300">
        Log Out
      </button>
    </>
  );
};

export default LogoutButton;
