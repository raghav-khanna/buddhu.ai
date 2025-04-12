import Header from '../../components/global/Header';
import MemoriesPanel from '../../components/MemoriesPanel';
import MoodHistoryPanel from '../../components/MoodHistoryPanel';
import MirrorCard from '../../components/MirrorCard';
import MannKiBaatCard from '../../components/MannKiBaatCard';
import CalendarStreakWidget from '../../components/Calendar';

function Home() {
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

export default Home;
