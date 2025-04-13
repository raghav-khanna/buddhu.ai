import { useNavigate } from 'react-router';
import TypingText from './global/TypingText';
import { useEffect, useState } from 'react';

function MirrorCard() {
  const suggestions = [
    {
      id: 1,
      text: 'Is there anything I’ve written that could help me right now?'
    },
    {
      id: 2,
      text: 'What’s something I learned last month?'
    },
    {
      id: 3,
      text: 'Am I growing in the areas I care about?'
    }
  ];

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/theMirror');
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
        The Mirror
      </p>
      <div className="flex flex-grow justify-between w-full h-full items-start">
        <div className="flex flex-col gap-1 w-[80%] h-full overflow-y-auto">
          {suggestions.slice(0, visibleCount).map((item: any) => {
            return (
              <div className="border-1 border-dashed border-text-contrast hover:border-accessible-green p-4 m-4 rounded-lg bg-card-content">
                <p className="text-text">
                  <TypingText text={item.text} />
                </p>
              </div>
            );
          })}
        </div>
        <div
          onClick={handleNavigate}
          className="chatWrapper flex border-l border-l-accessible-green hover:bg-accessible-green text-text w-2/10 justify-center h-full items-center rounded-br-lg text-xl font-bold">
          Chat
        </div>
      </div>
    </div>
  );
}

export default MirrorCard;
