import React from 'react';
import Header from '../../components/global/Header';
import MemoriesPanel from '../../components/MemoriesPanel';
import MoodHistoryPanel from '../../components/MoodHistoryPanel';
import MirrorCard from '../../components/MirrorCard';
import MannKiBaatCard from '../../components/MannKiBaatCard';

function Home() {
  return (
    <div className="bg-deepthought-primary text-deepthought-text min-h-screen font-body">
      <Header />
      <div className="h-screen flex flex-col">
        <div className="w-screen flex justify-around gap-4 p-6 h-[35vh]">
          <div className="w-full border rounded">
            <MemoriesPanel />
          </div>
          <div className="w-full border rounded">
            <MoodHistoryPanel />
          </div>
          <div className="w-[50%] border rounded">Calendar</div>
        </div>
        <div className="w-screen flex flex-cols justify-around gap-4 p-6 h-[55vh]">
          <div className="w-full border rounded">
            <MirrorCard />
          </div>
          <div className="w-full border rounded">
            <MannKiBaatCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
