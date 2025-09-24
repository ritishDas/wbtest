import { useEffect } from "react"
import Usercard from "./user"
import { useState } from "react";

export default function Supervisor(props){
const [users, setUsers] = useState([]);

  const [newuserid, setnewUserId] = useState('');
  const [newuserpass, setnewUserpass] = useState('');
  console.log('from supervisor component', props);

useEffect(() => {
(async()=>{
      console.log(`http://localhost:5000/api/supervisor/${props.userId}`);
      const result = await fetch(`http://localhost:5000/api/supervisor/${props.userId}`, {
        credentials:'include',
      }).then(res => res.json())

      setUsers(result.data);
    })()
  },[props.userId, handleSubmit]);

async function handleSubmit(e) {
    e.preventDefault();
    const formDataObject = {userId:newuserid,password:newuserpass};
      const result = await fetch(`http://localhost:5000/api/adduser`, {
        method: 'post',
        body: JSON.stringify(formDataObject),
        headers: {
          'content-type': 'application/json'
        }, 
        credentials:'include',
      }).then(res => res.json())

    alert(result.message);
  }

return (
  <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
    <div className="space-y-3">
      {users.map(entry => (
        <Usercard
          key={entry.userId}
          userId={entry.userId}
          role={entry.role}
        />
      ))}
    </div>

    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3"
    >
      <h3 className="text-md font-semibold text-gray-700 text-center">
        Add New User
      </h3>

      <div className="flex flex-col">
        <label
          htmlFor="userid"
          className="text-sm font-medium text-gray-600"
        >
          UserId
        </label>
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
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-600"
        >
          Password
        </label>
        <input
          id="password"
          type="text"
          name="password"
          value={newuserpass}
          onChange={(e) => setnewUserpass(e.target.value)}
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
);
}
