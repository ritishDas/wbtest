import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/auth";
import Login from './pages/login';

function App() {

  return (
    <AuthProvider>
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
    </AuthProvider>
  )
}

export default App
