import Header from '../../components/global/Header';
import MemoriesPanel from '../../components/MemoriesPanel';
import MoodHistoryPanel from '../../components/MoodHistoryPanel';
import MirrorCard from '../../components/MirrorCard';
import MannKiBaatCard from '../../components/MannKiBaatCard';

function Home() {
  return (
    <div className="bg-primary text-text min-h-screen font-body">
      <Header />
      <div className="h-screen flex flex-col">
        <div className="w-screen flex justify-around gap-4 p-6 min-h-[35vh]">
          <div className="w-full rounded-lg hover:ring-1 hover:bg-primary-hover">
            <MemoriesPanel />
          </div>
          <div className="w-full rounded-lg hover:ring-1 hover:bg-primary-hover">
            <MoodHistoryPanel />
          </div>
          <div className="w-[50%] border rounded-lg hover:ring-1 hover:bg-primary-hover">
            Calendar
          </div>
        </div>
        <div className="w-screen flex flex-cols justify-around gap-4 p-6 h-[55vh]">
          <div className="w-full border rounded-lg hover:ring-1 hover:bg-primary-hover">
            <MirrorCard />
          </div>
          <div className="w-full border rounded-lg hover:ring-1 hover:bg-primary-hover">
            <MannKiBaatCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
