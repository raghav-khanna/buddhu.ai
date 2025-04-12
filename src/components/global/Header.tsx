interface headerProps {
  title?: string;
}

function Header({ title }: headerProps) {
  return (
    <div className="border-b-1 flex justify-between items-center p-2">
      <p className=" pl-4 py-2 font-bold text-3xl text-[#02B075]">{title || 'Budhhu.ai'}</p>
      <div className="bg-[#4A4B4D] p-2 mr-2 ">Hello, K.</div>
    </div>
  );
}

export default Header;
