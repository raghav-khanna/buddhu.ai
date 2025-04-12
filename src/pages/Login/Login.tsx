import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <div className="bg-card-content text-text p-10 hover:rounded-lg shadow-md hover:shadow-accent transition-all duration-500 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold mb-4">Welcome to BuddhuAI</div>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-card-content  p-2 rounded-lg text-text font-bold hover:cursor-pointer shadow-md hover:shadow-accessible-green hover:bg-accessible-green-dark transition-all duration-300">
          Explore Buddhu
        </button>
      </div>
    </div>
  );
};

export default LoginButton;
