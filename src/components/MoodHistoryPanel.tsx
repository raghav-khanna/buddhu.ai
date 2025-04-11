import React, { JSX } from 'react';
import Happy from '../assets/Happy.png';
import Sad from '../assets/Sad.png';
import Excited from '../assets/Excited.png';
import Angry from '../assets/Angry.png';
import Normal from '../assets/Normal.png';

function MoodHistoryPanel() {
  const moodImages: JSX.Element[] = [
    <img
      key="1"
      src={Angry}
      alt="Idea 1"
      className="w-10 h-10 object-cover hover:w-15 hover:h-15"
    />,
    <img key="2" src={Sad} alt="Idea 1" className="w-10 h-10 object-cover hover:w-15 hover:h-15" />,
    <img
      key="3"
      src={Normal}
      alt="Idea 1"
      className="w-10 h-10 object-cover hover:w-15 hover:h-15"
    />,
    <img
      key="4"
      src={Happy}
      alt="Idea 1"
      className="w-10 h-10 object-cover hover:w-15 hover:h-15"
    />,
    <img
      key="5"
      src={Excited}
      alt="Idea 1"
      className="w-10 h-10 object-cover hover:w-15 hover:h-15"
    />
  ];
  const moodList: { day: string; mood: number }[] = [
    {
      day: 'Monday',
      mood: 1
    },
    {
      day: 'Tuesday',
      mood: 2
    },
    {
      day: 'Wednesday',
      mood: 3
    },
    {
      day: 'Thursday',
      mood: 4
    },
    {
      day: 'Friday',
      mood: 2
    },
    {
      day: 'Saturday',
      mood: 5
    },
    {
      day: 'Sunday',
      mood: 4
    }
  ];
  return (
    <div className="h-full rounded-lg w-full bg-primary-hover text-text">
      <p className="font-medium text-lg border-b-1 border-accessible-green p-2 rounded-t-lg">
        MOOD HISTORY
      </p>
      <div className="flex w-full justify-around h-[80%] items-center p-2">
        {moodList?.map((item) => (
          <div className="flex flex-col items-center gap-2 hover:drop-shadow-2xl">
            <div>{moodImages[item.mood - 1]}</div>
            <div className="text-sm">{item.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodHistoryPanel;
