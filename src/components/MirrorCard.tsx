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
    <div className="h-full rounded-lg w-full bg-[#202123] p-4">
      <p className="font-medium text-lg border-b-1 border-accessible-green p-2 rounded-t-lg uppercase">
        The Mirror
      </p>
      <div className="flex justify-between w-full h-full items-start gap-1">
        <div className="flex-2/3 flex flex-col gap-1 p-4">
          {suggestions.map((item: any) => {
            return (
              <div className="border-1 border-none w-[20vw] p-4 m-4 rounded-md bg-[#4A4B4D]">
                <p className="text-[text-contrast]">{item.text}</p>
              </div>
            );
          })}
        </div>
        <div className="chatWrapper flex bg-[#4A4B4D] text-[text-contrast]  flex-1/3 justify-center rounded-md w-full items-center m-4 h-[40vh]">
          + Chat
        </div>
      </div>
    </div>
  );
}

export default MirrorCard;
