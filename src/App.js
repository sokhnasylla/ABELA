import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Pages/Auth/Login';
import Home from './components/Pages/Home/Home';
import Support from './components/Pages/Support Technique/Support';
import RecoHlrIn from './components/Pages/Reco_hlr_in/RecoHlrIn';
import Mysmc from './components/Pages/MySMC/Mysmc';
import Maxit from './components/Pages/Home/Maxit/Maxit';
import Network from './components/Pages/Home/Network/Network';

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
          <Route path="/maxit" element={<Maxit/>} />
          <Route path="/network" element={<Network/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
