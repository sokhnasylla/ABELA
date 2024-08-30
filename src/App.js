import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import GestionProbleme from './components/Pages/MySMC/GestionProbleme/GestionProbleme';
import GestionIncident from './components/Pages/MySMC/GestionIncident/GestionIncident';
import Kaabu from './components/Pages/Kaabu/Kaabu';
import MonProfil from './components/Pages/MonProfil/MonProfil';

import Role from './components/Pages/Dashboard/Role/Role';
import Layout from './components/layout';
import LayoutAdmin from './components/layout-admin';
import DetailsIncident from './components/Pages/MySMC/GestionIncident/DetailsIncident';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
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
            <Route path="/mysmc/gestionprobleme" element={<Layout><GestionProbleme/></Layout>} />
            {<Route path="/mysmc/gestionincident" element={<Layout><GestionIncident /></Layout>} />}
            {/* <Route path="/gestionincident/ajoutavis" element={<Layout><AjoutAvis /></Layout>} />
            <Route path="/gestionincident/rechercheavis" element={<Layout><RechercheAvis /></Layout>} />
            <Route path="/gestionincident/statistique" element={<Layout><StatistiqueIncident /></Layout>} />
            <Route path="/mysmc/gestionprobleme/rechercherprobleme" element={<Layout><RechercheProbleme /></Layout>} />
            <Route path="/mysmc/gestionprobleme/scannerprobleme" element={<Layout><ScannerProbleme /></Layout>} /> */}
            {/* <Route path="/mysmc/gestionprobleme/details/:id" element={<Layout><DetailsProbleme /></Layout>} /> */}
            {/* <Route path="/mysmc/gestionincident/details/:id" element={<Layout><DetailsIncident /></Layout>} /> */}
            {/* <Route path="/mysmc/etatsupervision" element={<Layout><EtatSupervision /></Layout>} /> */}
            {/* <Route path="/etatsupervision/alarmesok" element={<Layout><AlarmeOk /></Layout>} />
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
            <Route path="/suivisactivites/scenariobook" element={<Layout><ScenarioBook /></Layout>} /> */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
