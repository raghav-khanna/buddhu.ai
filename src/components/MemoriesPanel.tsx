import React from 'react';

function MemoriesPanel() {
  const memories: { time: string; memory: string }[] = [
    {
      time: 'Today',
      memory: 'Started a new project at work'
    },
    {
      time: '2 days ago',
      memory: 'Felt anxious in a meeting'
    },
    {
      time: '1 week ago',
      memory: 'Had a productive day'
    },
    {
      time: '1 month ago',
      memory: 'Happy Happy Happy'
    }
  ];
  return (
    <div className=" h-full rounded-lg w-full bg-primary-hover text-text">
      <p className="font-medium text-lg border-b-1 border-accessible-green p-2 rounded-t-lg">
        MEMORIES
      </p>
      <div className="text-sm p-2 pl-4 flex flex-col gap-[0.5vh] mt-[0.5vh]">
        <div className="flex gap-[2vw] w-full font-thin text-lg text-text px-1">
          <div className="w-2/5">Time</div>
          <div className="w-3/5">Memory</div>
        </div>
        {/* {memories?.map((item) => ( */}
        <div className="flex gap-[2vw] w-full font-medium bg-grey-text p-1">
          <div className="w-2/5">{memories[0].time}</div>
          <div className="w-3/5">{memories[0].memory}</div>
        </div>
        <div className="flex gap-[2vw] w-full font-medium p-1">
          <div className="w-2/5">{memories[1].time}</div>
          <div className="w-3/5">{memories[1].memory}</div>
        </div>
        <div className="flex gap-[2vw] w-full font-medium bg-grey-text p-1">
          <div className="w-2/5">{memories[2].time}</div>
          <div className="w-3/5">{memories[2].memory}</div>
        </div>
        <div className="flex gap-[2vw] w-full font-medium p-1">
          <div className="w-2/5">{memories[3].time}</div>
          <div className="w-3/5">{memories[3].memory}</div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}

export default MemoriesPanel;
