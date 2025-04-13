import { useAuth0 } from '@auth0/auth0-react';
import Logo from '../../assets/brainIcon.svg';
import LoginImage from '../../assets/login-page-image.png';
import RightArrow from '../../assets/rightArrow.svg';
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <div className="bg-card-content text-text w-[50vw] h-[70vh] rounded-lg shadow-md flex items-center justify-center">
        <div className="flex-3/5 h-full p-4">
          <div className="header flex items-center justify-start gap-2">
            <img src={Logo} alt="logo" style={{ width: '50px', height: '50px' }} />
            <p className="font-bold uppercase">Buddhu.ai</p>
          </div>
          <div className="content flex flex-col items-center justify-center w-[20vw] my-0 mx-auto mt-30 ">
            <p className="font-bold text-3xl text-text mb-4">Ready to start your journey today?</p>
            <p className="text-contrast mb-4">
              Signup to our website and start recording your daily thoughts and activities so you
              don't have to think hard.
            </p>
            <p className="font-bold text-text">We will remember it for you!</p>
            <button
              onClick={() => loginWithRedirect()}
              className="bg-accessible-green px-4 py-2 rounded-md mt-8 cursor-pointer shadow-md hover:shadow-accent transition-all duration-500 flex items-center justify-center gap-2">
              <p>Login to Buddhu.ai</p>
              <img
                src={RightArrow}
                alt="arrow"
                style={{ width: '20px', height: '20px', color: '#fff' }}
              />
            </button>
          </div>
        </div>
        {/* <button
          onClick={() => loginWithRedirect()}
          className="bg-card-content  p-2 rounded-lg text-text font-bold hover:cursor-pointer shadow-md hover:shadow-accessible-green hover:bg-accessible-green-dark transition-all duration-300">
          Explore Buddhu
        </button> */}
        <div className="flex-2/5 bg-[#FEE8CC] h-full flex items-center justify-center">
          <img src={LoginImage} alt="login-image" />
        </div>
      </div>
    </div>
  );
};

export default LoginButton;
