import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router';

interface headerProps {
  title?: string;
  back?: string;
}

function Header({ title, back }: headerProps) {
  const navigate = useNavigate();
  const handleBack = () => {
    if (back) navigate(back);
  };
  return (
    <div className="border-b-1 flex justify-between items-center p-2">
      <div className="flex items-center  py-2">
        {back && <ArrowLeftIcon className="ml-4 w-8 h-auto" onClick={handleBack} />}
        <p className=" pl-4 font-bold text-3xl text-[#02B075]">{title || 'Budhhu.ai'}</p>
      </div>
      <div className="bg-[#4A4B4D] p-2 mr-2 ">Hello, K.</div>
    </div>
  );
}

export default Header;
