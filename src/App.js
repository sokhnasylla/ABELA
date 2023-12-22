import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Pages/Auth/Login';
import Home from './components/Pages/Home/Home';
import Support from './components/Pages/Support Technique/Support';
import RecoHlrIn from './components/Pages/Reco_hlr_in/RecoHlrIn';
import Mysmc from './components/Pages/MySMC/Mysmc';
import Dashboard from './components/Pages/Dashboard/Dashboard'
import SignUp from './components/Pages/Auth/SignUp';
import { QueryClient, QueryClientProvider } from 'react-query';
import User from './components/Pages/Dashboard/User';


const queryClient= new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/support" element={<Support/>}/>
            <Route path="/support/reco_hlr_in" element={<RecoHlrIn/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/mysmc" element={<Mysmc/>} />
            <Route path="/admin" element={<Dashboard/>} />
            <Route path="/admin/user" element={<User/>} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
