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

  return (
    <div className="h-full rounded-lg w-full bg-primary-hover p-4">
      <p className="font-medium text-lg border-accessible-green border-b-1 p-2 uppercase">
        mann ki baat
      </p>
      <div className="flex justify-between w-full h-full items-start gap-1">
        <div className="flex-2/3 flex flex-col gap-1 p-4">
          {setup.map((item: any) => {
            return (
              <div className="border-1 border-none w-[20vw] p-4 m-4 rounded-md bg-card-content">
                <p className="text-text-contrast">{item.question}</p>
              </div>
            );
          })}
          <div className="chatbox w-full p-4 rounded-md bg-card-content text-text-contrast text-center">
            Tell me about your day. Click here to type
          </div>
        </div>
        <div className="chatWrapper flex bg-card-content text-text-contrast flex-1/3 justify-center rounded-md w-full items-center m-4 h-[40vh]">
          + Enter your thoughts
        </div>
      </div>
    </div>
  );
}

export default MannKiBaatCard;
