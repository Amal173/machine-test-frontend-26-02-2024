import './App.css';
import Dashbord from './Components/Dashbord/Dashbord';
import { Routes, Route } from "react-router-dom"
import NotFound from './Components/NotFound/NotFound';
import Project from './Components/Project/Project';
import AdminLogin from './Components/Login/Login';
function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/kanbanbord" element={ <Dashbord/> } />
        <Route path="/project" element={ <Project/> } />
        <Route path="*" element={ <NotFound/> } />
        <Route path="/" element={ <AdminLogin/> } />
      </Routes>
    </div>
  );
}

export default App;
