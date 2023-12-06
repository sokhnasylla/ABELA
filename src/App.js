import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Pages/Auth/Login';
import Home from './components/Pages/Home/Home';
import Support from './components/Pages/Support Technique/Support';
import RecoHlrIn from './components/Pages/Reco_hlr_in/RecoHlrIn';
import Mysmc from './components/Pages/MySMC/Mysmc';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/support" element={<Support/>}/>
          <Route path="/support/reco_hlr_in" element={<RecoHlrIn/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/mysmc" element={<Mysmc/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
