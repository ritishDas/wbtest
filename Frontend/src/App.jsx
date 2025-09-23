import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';


function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
