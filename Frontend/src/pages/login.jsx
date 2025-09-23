import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

async function formHandler(e) {
      e.preventDefault();
      const formDataObject = {userId, password};
      const result = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(formDataObject)
      }).then(res => res.json())

      console.log(result);

      if(result.success){
      navigate('/dashboard');
      } else {
        alert('Login failed: ' + result.message);
      }
  }

  return  <div className="w-screen h-screen flex flex-col justify-center items-center ">
    <h1 className='text-lg font-bold m-2'>LOGIN</h1> 
    <form onSubmit={formHandler} className='flex flex-col rounded-lg justify-center border p-4 space-y-2'>
      <label htmlFor="userid">UserId:</label>
      <input onChange={(e) => {
        setUserId(e.target.value);
      }}
        type="text" name="userId" value={userId} id="userid" />
      <label htmlFor="password">Password:</label>
      <input  onChange={(e) => {
        setPassword(e.target.value);
      }}
        type="password" name="password" value={password} id="password" />
      <input type="submit" value="Submit" className='cursor-pointer bg-green-400 p-1 rounded-md font-bold text-gray-800 mt-1'/>
    </form>
  </div>;
}
