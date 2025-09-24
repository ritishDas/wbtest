import { useState } from "react";
import { useEffect } from "react"
import Supervcard from "./supervcard";


export default function Admin() {
  const [supervisors, setSupervisors] = useState([]);
  const [newuserid, setnewUserId] = useState('');
  const [newuserpass, setnewUserpass] = useState('');
  const [newusersupv, setnewusersupv] = useState('');

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
    <h1>Admin</h1>
<h2>Supervisors</h2>

    {supervisors.map(entry => <Supervcard key={entry.userId} userId={entry.userId} users={entry.users}/>) }
    <form>
      <h2>Add New User</h2>
      <label htmlFor="userid">UserId</label>
      <input id="userid" onChange={(e)=>setnewUserId(e.target.value)} type="text" name="userId" value={newuserid}/>
      <label htmlFor="password">Password</label>
      <input id="password" onChange={(e)=>setnewUserpass(e.target.value)} type="text" name="password" value={newuserpass}/>

      <label htmlFor="supervisor">Supervisor</label>
      <input id="supervisor" onChange={(e)=>setnewusersupv(e.target.value)} type="text" name="supervisor" value={newusersupv}/>

      <input type="submit" name="userId" value="Submit"/>
    </form>
  </div>
}
