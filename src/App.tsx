import { Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import TheMirror from './pages/TheMirror/TheMirror';
import MannKiBaat from './pages/MannKiBaat/MannKiBaat';
import LoginButton from './pages/Login/Login';
import RootRedirect from './components/global/RootRedirect';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/theMirror" element={<TheMirror />} />
        <Route path="/mannKiBaat" element={<MannKiBaat />} />
        <Route path="/login" element={<LoginButton />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
