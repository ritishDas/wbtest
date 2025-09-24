import { useEffect } from "react"
import Usercard from "./user"
import { useState } from "react";

export default function Supervisor(props){
const [users, setUsers] = useState([]);

  const [newuserid, setnewUserId] = useState('');
  console.log('from supervisor component', props);

useEffect(() => {
(async()=>{
//      fetch('http://localhost:5000/');
      console.log(`http://localhost:5000/api/supervisor/${props.userId}`);
      const result = await fetch(`http://localhost:5000/api/supervisor/${props.userId}`, {
        credentials:'include',
      }).then(res => res.json())

      setUsers(result.data);
    })()
  },[props.userId]);

  return <div>
    {users.map(entry => 
    <Usercard key={entry.userId} userId={entry.userId} role={entry.role}/>
    )}

    <form>
      <h3>Add New User</h3>
      <label for="username"></label>
    </form>

  </div>
}
