export default function Usercard(props) {
return (
  <div className="flex justify-between items-center border rounded-lg p-3 bg-yellow-100 shadow-sm">
    <span className="font-medium text-gray-800">{props.userId}</span>

    <div className="px-3 py-1 bg-white border rounded-md shadow-sm">
      <span className="text-sm font-semibold text-gray-600">Role:</span>
      <span className="ml-1 text-sm font-light text-gray-800">{props.role}</span>
    </div>
  </div>
);
}
