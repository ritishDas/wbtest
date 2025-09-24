import { useState } from "react";
import { useEffect } from "react"
import Supervcard from "./supervcard";


export default function Admin() {
  const [supervisors, setSupervisors] = useState([]);
  const [newuserid, setnewUserId] = useState('');
  const [newuserpass, setnewUserpass] = useState('');
  const [newusersupv, setnewusersupv] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const formDataObject = {userId:newuserid,password:newuserpass, supervisor:newusersupv};
      const result = await fetch(`http://localhost:5000/api/admin/adduser`, {
        method: 'post',
        body: JSON.stringify(formDataObject),
        headers: {
          'content-type': 'application/json'
        }, 
        credentials:'include',
      }).then(res => res.json())

    alert(result.message);
  }

  useEffect(()=>{
    (async() => {
      const result = await fetch(`http://localhost:5000/api/adminfetch`, {
        credentials:'include',
      }).then(res => res.json())
      console.log(result.data);
      setSupervisors(result.data);
    })()
  },[]);

  return <div>
    <h2 class="m-10 text-xl font-bold">Admin Dashboard</h2>
    <div class="flex justify-center space-x-10 items-center">
      <div>
<h2 class="m-5 text-lg font-bold">Supervisors</h2>

    {supervisors.map(entry => <Supervcard key={entry.userId} userId={entry.userId} users={entry.users}/>) }
        
      </div>
<form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white rounded-xl shadow-md space-y-3">
  <h2 className="text-lg font-semibold text-gray-700 text-center">Add New User</h2>

  <div className="flex flex-col">
    <label htmlFor="userid" className="text-sm font-medium text-gray-600">UserId</label>
    <input
      id="userid"
      type="text"
      name="userId"
      value={newuserid}
      onChange={(e) => setnewUserId(e.target.value)}
      className="mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
    <input
      id="password"
      type="text"
      name="password"
      value={newuserpass}
      onChange={(e) => setnewUserpass(e.target.value)}
      className="mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="supervisor" className="text-sm font-medium text-gray-600">Supervisor</label>
    <input
      id="supervisor"
      type="text"
      name="supervisor"
      value={newusersupv}
      onChange={(e) => setnewusersupv(e.target.value)}
      className="mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
  >
    Submit
  </button>
</form>
      
    </div>
  </div>
}
