import Usercard from "./user"
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Supervcard(props) {

 async function handleDelete(userId) {
    const formDataObject = {userId};
      const result = await fetch(`${backendUrl}/api/admin/delete`, {
        method: 'put',
        body: JSON.stringify(formDataObject),
        headers: {
          'content-type': 'application/json'
        }, 
        credentials:'include',
      }).then(res => res.json())

    alert(result.message);
    await props.fun();
  }

return (
  <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-xl space-y-4">
    <h2 className="text-lg font-semibold text-gray-700">{props.userId}</h2>

    {props.users.map(entry => (
      <div
        key={entry.userId}
        className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
      >
        <Usercard userId={entry.userId} role={entry.role} />

        <button
          onClick={() => handleDelete(entry.userId)}
          className="ml-4 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);
}

