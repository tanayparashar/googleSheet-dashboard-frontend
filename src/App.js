import './App.css';
import { Login } from "./components/login/login";
import { Register } from "./components/login/register";
import { Suscription } from './components/subscriptions/subscriptions';
import { SheetsAccessForm } from './components/sheetsAccessForm/sheetsAccessForm';
import { Dashboard } from './components/dashboard/dashboard';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/subscriptions" element={<Suscription/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/selectSheet/:email/:access_token" element={<SheetsAccessForm/> }/>
      </Routes>
    </div>
  );
}

export default App;
