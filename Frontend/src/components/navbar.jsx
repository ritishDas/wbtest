import {Link} from 'react-router-dom';

export default function Navbar() {
  return <nav className="flex justify-between items-center p-5 bg-gray-100 border">
    <Link to="/">Home</Link>
    <span className='flex items-center space-x-2'>
    <Link to="/dashboard">Dashboard</Link>
    <Link className='p-2 bg-green-500 rounded-md hover:bg-green-700' to="/login">Login</Link>
    <Link className="p-2 bg-red-500 rounded-md hover:bg-red-700" to="/logout">Logout</Link>
    </span>
  </nav>
}
