import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/auth';
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export default function Navbar() {
  useEffect(() => {
(async()=>{
      const result = await fetch(`${backendUrl}/api/usercheck`, {
        credentials:'include',
      }).then(res => res.json())
      console.log(result.success);
      if(result.success)
        setIsAuthenticated(true);
    })()
  },[]);

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  async function handleLogout() {
      const result = await fetch(`${backendUrl}/api/logout`, {
        credentials:'include',
      method:'POST',
      }).then(res => res.json())

    console.log(result)
    if(result.success)
    setIsAuthenticated(false);
  }

  return <nav className="flex justify-between items-center p-5 bg-gray-100 border">
    <Link to="/">Home</Link>
    <span className='flex items-center space-x-2'>
    {isAuthenticated&&<Link to="/dashboard">Dashboard</Link>}
    {!isAuthenticated&&<Link className='p-2 bg-green-500 rounded-md hover:bg-green-700' to="/login">Login</Link>}
    {isAuthenticated&&<button onClick={handleLogout} className="p-2 bg-red-500 rounded-md hover:bg-red-700">Logout</button>}
    </span>
  </nav>
}
