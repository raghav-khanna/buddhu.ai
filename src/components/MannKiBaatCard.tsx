import { useNavigate } from 'react-router';

function MannKiBaatCard() {
  const setup = [
    {
      id: 1,
      question:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore minima excepturi dolorem dignissimos voluptate expedita natus ut, odit maxime?'
    },
    {
      id: 2,
      question:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore minima excepturi dolorem dignissimos voluptate expedita natus ut, odit maxime?'
    }
  ];

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-full rounded-lg w-full bg-primary-hover flex flex-col">
      <p className="font-medium text-lg border-b-1 border-accessible-green p-2 rounded-t-lg uppercase">
        mann ki baat
      </p>
      <div className="flex flex-grow justify-between w-full h-full items-start">
        <div className="flex flex-col gap-1 w-[90%] h-full">
          <div className="overflow-y-hidden">
            {setup.map((item: any) => {
              return (
                <div className="border-1 border-dashed border-text-contrast p-4 m-4 rounded-md bg-card-content">
                  <p className="text-text-contrast">{item.question}</p>
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
          className="chatWrapper flex border-l border-l-accessible-green hover:bg-accessible-green text-text w-1/10 justify-center h-full items-center rounded-br-lg text-lg font-bold text-center">
          <div className="w-full p-2">Add to Journal</div>
        </div>
      </div>
    </div>
  );
}

export default MannKiBaatCard;
