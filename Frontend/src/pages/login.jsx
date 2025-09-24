import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../context/auth';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useAuth();
async function formHandler(e) {
      e.preventDefault();
      const formDataObject = {userId, password};
      const result = await fetch(`${backendUrl}/api/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(formDataObject)
      }).then(res => res.json())

      console.log(result);

      if(result.success){
      navigate('/dashboard');
      setIsAuthenticated(true);
      } else {
        alert('Login failed: ' + result.message);
      }
  }

return (
  <div className="w-screen h-min-screen flex flex-col justify-center items-center bg-gray-100">
    <h1 className="text-2xl font-bold mb-6">LOGIN</h1> 
    
    <form 
      onSubmit={formHandler} 
      className="flex flex-col rounded-lg border border-gray-300 bg-white p-6 shadow-md space-y-4 w-80"
    >
      <div className="flex flex-col">
        <label htmlFor="userid" className="mb-1 font-medium">UserId:</label>
        <input 
          onChange={(e) => setUserId(e.target.value)}
          type="text" 
          name="userId" 
          value={userId} 
          id="userid" 
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 font-medium">Password:</label>
        <input 
          onChange={(e) => setPassword(e.target.value)}
          type="password" 
          name="password" 
          value={password} 
          id="password" 
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <input 
        type="submit" 
        value="Submit" 
        className="cursor-pointer bg-green-400 hover:bg-green-500 transition-colors p-2 rounded-md font-bold text-gray-900"
      />
    </form>

    <div className="mt-6 w-80 bg-yellow-100 p-4 rounded-lg space-y-2 text-sm">
      <p><span className="font-bold">Admin:</span> userId: 'adminritish', password: 'pass123', role: 'admin'</p>
      <p><span className="font-bold">Supervisors:</span></p>
      <ul className="pl-4 list-disc">
        <li>userId: 'sup1ritish', password: 'pass123', role: 'supervisor'</li>
        <li>userId: 'sup2ritish', password: 'pass123', role: 'supervisor'</li>
      </ul>
      <p><span className="font-bold">Users:</span></p>
      <ul className="pl-4 list-disc">
        <li>userId: 'client1ritish', password: 'pass123', role: 'user', supervisor: 'sup1ritish'</li>
        <li>userId: 'client2ritish', password: 'pass123', role: 'user', supervisor: 'sup1ritish'</li>
        <li>userId: 'client3ritish', password: 'pass123', role: 'user', supervisor: 'sup2ritish'</li>
        <li>userId: 'client4ritish', password: 'pass123', role: 'user', supervisor: 'sup2ritish'</li>
      </ul>
    </div>
  </div>
);
}
