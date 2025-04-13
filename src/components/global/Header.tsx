import { useAuth0 } from '@auth0/auth0-react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { JSX, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

interface headerProps {
  title?: string;
  back?: string;
}

function Header({ title, back }: headerProps) {
  const navigate = useNavigate();
  const handleBack = () => {
    if (back) navigate(back);
  };

  const { user, isLoading, isAuthenticated, logout } = useAuth0();
  const [userIcon, setUserIcon] = useState<JSX.Element>();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<any>(undefined);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      setUserIcon(
        <img
          src={user.picture}
          alt={user.name}
          className="w-8 h-auto rounded-full border border-text shadow"
        />
      );
    } else if (!isLoading && !isAuthenticated) {
      console.log('User is not authenticated');
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  return (
    <div className="border-b-1 flex justify-between items-center p-2 sticky">
      <div className="flex items-center py-2">
        {back && <ArrowLeftIcon className="ml-4 w-8 h-auto" onClick={handleBack} />}
        <p className=" pl-4 font-bold text-3xl text-[#02B075]">{title || 'Budhhu.ai'}</p>
      </div>
      {!isOpen ? (
        <div
          className="bg-card-content p-2 mr-2 flex gap-2 items-center rounded-lg fill-accessible-green drop-shadow-md drop-shadow-accessible-green"
          onClick={() => setIsOpen(!isOpen)}>
          {userIcon}
          <div className="capitalize">{user?.name?.split(' ')[0].toLowerCase()}</div>
        </div>
      ) : (
        <button
          ref={menuRef}
          className="bg-card-content h-12 p-2 min-w-25 mr-2 gap-2 items-center rounded-lg flex justify-center fill-accent drop-shadow-md drop-shadow-accent"
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          <div className="capitalize">LogOut</div>
        </button>
      )}
    </div>
  );
}

export default Header;
