import { Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import TheMirror from './pages/TheMirror/TheMirror';
import MannKiBaat from './pages/MannKiBaat/MannKiBaat';

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/theMirror" element={<TheMirror />} />
        <Route path="/mannKiBaat" element={<MannKiBaat />} />
      </Routes>
    </>
  );
}

export default App;
