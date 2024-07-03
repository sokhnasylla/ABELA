import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Support from './components/Pages/Support Technique/Support';
import RecoHlrIn from './components/Pages/Reco_hlr_in/RecoHlrIn';
import Mysmc from './components/Pages/MySMC/Mysmc';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import SignUp from './components/Pages/Auth/SignUp';
import { QueryClient, QueryClientProvider } from 'react-query';
import Maxit from './components/Pages/Maxit/Maxit';
import Network from './components/Pages/Network/Network';
import User from './components/Pages/Dashboard/Utilisateurs/User';
import AddUser from './components/Pages/Auth/AddUser';
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
import ScenarioBook from './components/Pages/MySMC/SuivisActivites/ScenarioBook';
import Kaabu from './components/Pages/Kaabu/Kaabu';
import RechercheProbleme from './components/Pages/MySMC/GestionProbleme/RechercheProbleme';
import AnaTestRas from './components/Pages/MySMC/SuivisActivites/AnaTestRas';
import MonProfil from './components/Pages/MonProfil/MonProfil';
import DetailsProbleme from './components/Pages/MySMC/GestionProbleme/DetailsProbleme/DetailsProbleme';
import DetailsIncident from './components/Pages/MySMC/GestionIncident/DetailsIncident/DetailsIncident';
import Role from './components/Pages/Dashboard/Role/Role';
import Layout from './components/layout';
import LayoutAdmin from './components/layout-admin';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/signin" element={<SignInSide />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/support" element={<Layout><Support /></Layout>} />
            <Route path="/support/reco_hlr_in" element={<Layout><RecoHlrIn /></Layout>} />
            <Route path="/mysmc" element={<Layout><Mysmc /></Layout>} />
            <Route path="/monprofil" element={<Layout><MonProfil /></Layout>} />
            <Route path="/admin" element={<LayoutAdmin><Dashboard /></LayoutAdmin> } />
            <Route path="/admin/user" element={<LayoutAdmin><User /></LayoutAdmin>} />
            <Route path="/admin/role" element={<LayoutAdmin><Role /></LayoutAdmin>} />
            <Route path="/admin/group" element={<LayoutAdmin><AddUser /></LayoutAdmin>} />
            <Route path="/maxit" element={<Layout><Maxit /></Layout>} />
            <Route path="/kaabu" element={<Layout><Kaabu /></Layout>} />
            <Route path="/network" element={<Layout><Network /></Layout>} />
            <Route path="/mysmc/gestionincident" element={<Layout><GestionIncident /></Layout>} />
            <Route path="/gestionincident/ajoutavis" element={<Layout><AjoutAvis /></Layout>} />
            <Route path="/gestionincident/rechercheavis" element={<Layout><RechercheAvis /></Layout>} />
            <Route path="/gestionincident/statistique" element={<Layout><StatistiqueIncident /></Layout>} />
            <Route path="/mysmc/gestionprobleme" element={<Layout><GestionProbleme /></Layout>} />
            <Route path="/mysmc/gestionprobleme/rechercherprobleme" element={<Layout><RechercheProbleme /></Layout>} />
            <Route path="/mysmc/gestionprobleme/scannerprobleme" element={<Layout><ScannerProbleme /></Layout>} />
            <Route path="/mysmc/gestionprobleme/details/:id" element={<Layout><DetailsProbleme /></Layout>} />
            <Route path="/mysmc/gestionincident/details/:id" element={<Layout><DetailsIncident /></Layout>} />
            <Route path="/mysmc/etatsupervision" element={<Layout><EtatSupervision /></Layout>} />
            <Route path="/etatsupervision/alarmesok" element={<Layout><AlarmeOk /></Layout>} />
            <Route path="/etatsupervision/vr04service" element={<Layout><VR04Service /></Layout>} />
            <Route path="/etatsupervision/vr24service" element={<Layout><VR24Service /></Layout>} />
            <Route path="/etatsupervision/vr04application" element={<Layout><VR04Application /></Layout>} />
            <Route path="/etatsupervision/gestionmaintenance" element={<Layout><GestionMaintenance /></Layout>} />
            <Route path="/etatsupervision/gesmaintenance/recherchemaintenance" element={<Layout><RechercheMaintenance /></Layout>} />
            <Route path="/etatsupervision/historiquedesactivation" element={<Layout><HistoriqueDesactivation /></Layout>} />
            <Route path="/etatsupervision/creeralarme" element={<Layout><CreerAlarme /></Layout>} />
            <Route path="/etatsupervision/groupealarme" element={<Layout><GroupeAlarme /></Layout>} />
            <Route path="/etatsupervision/baseconnaissance" element={<Layout><BaseConnaissance /></Layout>} />
            <Route path="/mysmc/suivisactivites" element={<Layout><SuivisActivites /></Layout>} />
            <Route path="/suivisactivites/anatest" element={<Layout><AnaTest /></Layout>} />
            <Route path="/suivisactivites/anatestras" element={<Layout><AnaTestRas /></Layout>} />
            <Route path="/suivisactivites/scenariobook" element={<Layout><ScenarioBook /></Layout>} />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
