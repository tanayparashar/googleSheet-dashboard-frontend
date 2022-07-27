import './App.css';
import { Login } from "./components/login/login";
import { Register } from "./components/login/register";
import { Suscription } from './components/subscriptions/subscriptions';
import { SheetsAccessForm } from './components/sheetsAccessForm/sheetsAccessForm';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/home" element={<Suscription/>}/>
        <Route path='/register' element={<Register />} />
        <Route path="/selectSheet/:access_token" element={<SheetsAccessForm/> }/>
      </Routes>
    </div>
  );
}

export default App;
