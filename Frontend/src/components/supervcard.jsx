import Usercard from "./user"

export default function Supervcard(props) {

  return <div>
    {props.userId}    
    {props.users.map(entry => <Usercard key={entry.userId} userId={entry.userId} role={entry.role}/>) }
  </div>
}

