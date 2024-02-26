import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Support from './components/Pages/Support Technique/Support';
import RecoHlrIn from './components/Pages/Reco_hlr_in/RecoHlrIn';
import Mysmc from './components/Pages/MySMC/Mysmc';
import Dashboard from './components/Pages/Dashboard/Dashboard'
import SignUp from './components/Pages/Auth/SignUp';
import { QueryClient, QueryClientProvider } from 'react-query';
import Maxit from './components/Pages/Maxit/Maxit';
import Network from './components/Pages/Network/Network';
import User from './components/Pages/Dashboard/Utilisateurs/User';
import Auth from './components/Pages/Auth/Auth';
import SignInSide from './components/Pages/Auth/SignIn';
import GestionIncident from './components/Pages/MySMC/GestionIncident/GestionIncident';
import AjoutAvis from './components/Pages/MySMC/GestionIncident/AjoutAvis';
import RechercheAvis from './components/Pages/MySMC/GestionIncident/RechercheAvis';
import StatistiqueIncident from './components/Pages/MySMC/GestionIncident/StatistiqueIncident';
import GestionProbleme from './components/Pages/MySMC/GestionProbleme/GestionProbleme';
import ScannerProbleme from './components/Pages/MySMC/GestionProbleme/ScannerProbleme';
import EtatSupervision from './components/Pages/MySMC/EtatSupervision/EtatSupervision';
import CreerAlarme from './components/Pages/MySMC/EtatSupervision/CreerAlarme';
import GroupeAlarme from './components/Pages/MySMC/EtatSupervision/GroupeAlarme';
import BaseConnaissance from './components/Pages/MySMC/EtatSupervision/BaseConnaissance';
import SuivisActivites from './components/Pages/MySMC/SuivisActivites/SuivisActivites';
import AlarmeOk from './components/Pages/MySMC/EtatSupervision/AlarmeOk';
import VR04Service from './components/Pages/MySMC/EtatSupervision/VR04Service';
import VR24Service from './components/Pages/MySMC/EtatSupervision/VR24Service';
import VR04Application from './components/Pages/MySMC/EtatSupervision/VR04Application';
import GestionMaintenance from './components/Pages/MySMC/EtatSupervision/GestionMaintenance';
import RechercheMaintenance from './components/Pages/MySMC/EtatSupervision/RechercheMaintenance';
import HistoriqueDesactivation from './components/Pages/MySMC/EtatSupervision/HistoriqueDesactivation';
import AnaTest from './components/Pages/MySMC/SuivisActivites/AnaTest';
import Kaabu from './components/Pages/Kaabu/Kaabu';



const queryClient= new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInSide/>}/>
            <Route path="/support" element={<Support/>}/>
            <Route path="/support/reco_hlr_in" element={<RecoHlrIn/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/mysmc" element={<Mysmc/>} />
            <Route path="/admin" element={<Dashboard/>} />
            <Route path="/admin/user" element={<User/>} />
            <Route path="/admin/group" element={<Auth/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/maxit" element={<Maxit/>} />
             <Route path="/kaabu" element={<Kaabu/>} /> 
            <Route path="/network" element={<Network/>} />
            < Route path="/mysmc/gestionincident" element={<GestionIncident/>} />
            < Route path="/gestionincident/ajoutavis" element={<AjoutAvis/>} />
            < Route path="/gestionincident/rechercheavis" element={<RechercheAvis/>} />
            < Route path="/gestionincident/statistique" element={<StatistiqueIncident/>} />
            < Route path="/mysmc/gestionprobleme" element={<GestionProbleme/>} />
            < Route path="/gestionprobleme/scannerprobleme" element={<ScannerProbleme/>} />
            < Route path="/mysmc/etatsupervision" element={<EtatSupervision/>} />
            < Route path="/etatsupervision/alarmesok" element={<AlarmeOk/>} />
            < Route path="/etatsupervision/vr04service" element={<VR04Service/>} />
            < Route path="/etatsupervision/vr24service" element={<VR24Service/>} />
            <Route path='/etatsupervision/vr04application' element={<VR04Application/>} />
            <Route path='/etatsupervision/gestionmaintenance' element={<GestionMaintenance/>} />
            <Route path='/etatsupervision/gesmaintenance/recherchemaintenance' element={<RechercheMaintenance/>} />
            < Route path="/etatsupervision/historiquedesactivation" element={<HistoriqueDesactivation/>} />
            < Route path="/etatsupervision/creeralarme" element={<CreerAlarme/>} />
            < Route path="/etatsupervision/groupealarme" element={<GroupeAlarme/>} />
            < Route path="/etatsupervision/baseconnaissance" element={<BaseConnaissance/>} />
            < Route path="/mysmc/suivisactivites" element={<SuivisActivites/>} />
            < Route path="/suivisactivites/anatest" element={<AnaTest/>} />
            
            

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
