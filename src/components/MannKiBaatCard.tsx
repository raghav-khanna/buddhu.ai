import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import TypingText from './global/TypingText';

function MannKiBaatCard() {
  const suggestions = [
    {
      id: 1,
      question: 'One thing that made me smile today was…'
    },
    {
      id: 2,
      question: 'If my future self wrote me a letter, it might say…'
    },
    {
      id: 3,
      question: 'One thing I want to change is…'
    }
  ];

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const [visibleCount, setVisibleCount] = useState(0);

  const DELAY_BETWEEN = 1200; // milliseconds
  useEffect(() => {
    if (visibleCount < suggestions.length) {
      const timeout = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, DELAY_BETWEEN);
      return () => clearTimeout(timeout);
    }
  }, [visibleCount]);

  return (
    <div className="h-full rounded-lg w-full bg-primary-hover flex flex-col">
      <p className="font-medium text-lg border-b-1 border-accessible-green p-2 rounded-t-lg uppercase">
        mann ki baat
      </p>
      <div className="flex flex-grow justify-between w-full h-full items-start">
        <div className="flex flex-col gap-1 w-[80%] h-full">
          <div className="overflow-y-hidden">
            {suggestions.slice(0, visibleCount).map((item: any) => {
              return (
                <div className="border-1 border-dashed border-text-contrast hover:border-accessible-green p-4 m-4 rounded-lg bg-card-content">
                  <p className="text-text">
                    <TypingText text={item.question} />
                  </p>
                </div>
              );
            })}
          </div>
          <div
            onClick={() => handleNavigate('/dailyChat')}
            className="chatbox w-full p-4 rounded-bl-lg hover:bg-accessible-green bg-card-content text-text text-center font-medium text-lg hover:text-xl">
            Tell me about your day. Click here to chat
          </div>
        </div>
        <div
          onClick={() => handleNavigate('/mannKiBaat')}
          className="chatWrapper flex border-l border-l-accessible-green hover:bg-accessible-green text-text w-2/10 justify-center h-full items-center rounded-br-lg text-lg font-bold text-center">
          <div className="w-full p-2">Add to Journal</div>
        </div>
      </div>
    </div>
  );
}

export default MannKiBaatCard;
