function MirrorCard() {
  const suggestions = [
    {
      id: 1,
      text: 'Suggestion 1'
    },
    {
      id: 2,
      text: 'Suggestion 2'
    },
    {
      id: 3,
      text: 'Suggestion 3'
    }
  ];

  return (
    <div className="h-full rounded-lg w-full bg-primary-hover flex flex-col">
      <p className="font-medium text-lg border-b-1 border-accessible-green p-2 rounded-t-lg uppercase">
        The Mirror
      </p>
      <div className="flex flex-grow justify-between w-full h-full items-start gap-1">
        <div className="flex flex-col gap-1 w-[90%] h-full overflow-y-auto">
          {suggestions.map((item: any) => {
            return (
              <div className="border-1 border-dashed border-text-contrast p-4 m-4 rounded-md bg-card-content">
                <p className="text-text-contrast">{item.text}</p>
              </div>
            );
          })}
        </div>
        <div className="chatWrapper flex flex-grow border-l border-l-accessible-green hover:bg-accessible-green text-text w-1/10 justify-center h-full items-center object-cover rounded-br-lg text-xl font-bold">
          Chat
        </div>
      </div>
    </div>
  );
}

export default MirrorCard;
