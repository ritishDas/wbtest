export default function Usercard(props) {
  return <div className="border rounded-lg p-2 flex justify-around items-center bg-yellow-100">
    <span> {props.userId} </span>
    <div className="bg-white rounded-sm">
    <span className="font-bold m-1"> Role: </span>
    <span className="font-light m-1"> {props.role} </span>
    </div>
  </div>
}
