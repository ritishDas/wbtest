import { useEffect } from "react";
import { useAuth } from "../context/auth";
import { useState } from "react";
import Supervisor from "../components/supervisor";

export default function Dashboard() {

  const [user, setUser] = useState({userId:'', role:''});

useEffect(() => {
(async()=>{
//      fetch('http://localhost:5000/');
      const result = await fetch('http://localhost:5000/api/usercheck', {
        credentials:'include',
      }).then(res => res.json())
      console.log(result);
      if(result.success){
        setIsAuthenticated(true);
        setUser(result.data);
      }
    })()
  },[]);

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  return <div>
   <h1 className="text-3xl font-bold m-5">Dashboard</h1> 
    {!isAuthenticated?<span className="text-center m-auto p-4 rounded-sm w-100 bg-yellow-100 block text-yellow-700">Please Login First</span>:
      <div>
        <h2 className="m-4 text-lg"><span className="font-bold">Welcome </span>{user.userId}</h2>
       {(user.role==='admin'?<>Admin</>:<Supervisor userId={user.userId}/>)}
      </div>
      }


  </div>;
}
