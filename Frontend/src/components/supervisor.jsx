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
//      fetch('http://localhost:5000/');
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

  return <div>
    {users.map(entry => 
    <Usercard key={entry.userId} userId={entry.userId} role={entry.role}/>
    )}

    <form onSubmit={handleSubmit}>
      <h3>Add New User</h3>
      <label htmlFor="userid">UserId</label>

      <input id="userid" onChange={(e)=>setnewUserId(e.target.value)} type="text" name="userId" value={newuserid}/>
      <label htmlFor="password">Password</label>

      <input id="password" onChange={(e)=>setnewUserpass(e.target.value)} type="text" name="password" value={newuserpass}/>
      <input type="submit" name="userId" value="Submit"/>
    </form>

  </div>
}
