import Header from '../../components/global/Header';
import MemoriesPanel from '../../components/MemoriesPanel';
import MoodHistoryPanel from '../../components/MoodHistoryPanel';
import MirrorCard from '../../components/MirrorCard';
import MannKiBaatCard from '../../components/MannKiBaatCard';
import CalendarStreakWidget from '../../components/Calendar';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';
import Loader from '../../components/Loader';

function Home() {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  // Log user details once authentication is confirmed and user data is available
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      console.log('User is authenticated');
    } else if (!isLoading && !isAuthenticated) {
      console.log('User is not authenticated');
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isLoading, isAuthenticated, user, navigate]); // Dependency array

  // Handle loading state from the hook itself
  if (isLoading) {
    return <Loader />;
  } else if (!isLoading && isAuthenticated) {
    return (
      <div className="bg-primary text-text min-h-screen font-body">
        <Header />
        <div className="h-full flex flex-col gap-1 pb-8">
          <div className="w-screen flex justify-around gap-4 px-6 pt-4 min-h-fit">
            <div className="w-full rounded-lg hover:ring-1 hover:bg-primary-hover">
              <MemoriesPanel />
            </div>
            <div className="w-full rounded-lg hover:ring-1 hover:bg-primary-hover">
              <MoodHistoryPanel />
            </div>
            <div className="w-[50%] rounded-lg hover:ring-1 hover:bg-primary-hover">
              <CalendarStreakWidget />
            </div>
          </div>
          <div className="w-screen flex flex-cols justify-around gap-4 px-6 pt-3 h-fit">
            <div className="w-full rounded-lg hover:ring-1 hover:bg-primary-hover">
              <MirrorCard />
            </div>
            <div className="w-full rounded-lg hover:ring-1 hover:bg-primary-hover">
              <MannKiBaatCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
