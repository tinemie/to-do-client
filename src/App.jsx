import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dotenv from 'dotenv';
dotenv.config();

function App() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(' ');
  const [password, setPassword] = useState(' ');

  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    console.log(username, password);
    await axios.post(`${process.env.REACT_APP_ENDPOINT_URL}/check-user`, { username, password })
      .then((response) => {
        if (response.data.exist){
          setShowError(false);
          navigate('/todo');
        }
        else {
          setShowError(true);
        }
      });
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-purple-500">
        <div className="w-xl h-[500px] bg-purple-400 flex flex-col justify-center p-5 gap-5">
          <h1 className="text-5xl mx-10 py-10">WALK THE LINE</h1>

          {
            showError &&
            <div className="bg-blue-200 text-blue-500 p-3 rounded-lg font-medium">
              Invalid username or password
            </div>
          }
          <div className="flex flex-col">
            <label htmlFor="username">Username:</label>
            <input type="text" className="outline text-white" onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input type="password" className="outline text-white" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="button" onClick={handleLogin} className="bg-purple-300 text-pink py-3 font-medium text-xl">LOGIN</button>
        </div>
      </div>
    </>
  )
}
export default App