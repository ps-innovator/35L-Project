import { useState, useContext } from 'react';
import { AuthContext, TabContext } from '../App';

const Login = () => {
    //Referenced documentation for input tag: https://flowbite.com/docs/forms/input-field/
    const { auth, setAuth } = useContext(AuthContext);
    const { tab, setTab } = useContext(TabContext);
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');
    const attemptLogin = async () => {
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({username: uname, password: pwd})
        });
        if(res.ok) {
            const json = await res.json();
            setAuth(json);
            setTab(0);
            console.log(json);
            console.log("works");
        } else {
            console.log("login failed");
        }
    };

    return (
        <div>
          <h1
            className="text-2xl text-black dark:text-white"
            style={{
              marginTop: "5%",
              marginBottom: "5%",
              fontWeight: "500",
              fontSize: 45,
            }}
          >
            Login
          </h1>
          <div className="flex mb-6 items-center justify-center">
            <input name="uname"
            placeholder="Username" 
            value={uname}
            onChange={(e) => setUname(e.target.value)}   
            className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex mb-6 items-center justify-center">
            <input name="pwd"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            type="password"
            className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex mb-6 items-center justify-center">
            <button onClick={attemptLogin} className="block text-white p-4 rounded-lg bg-indigo-500 dark:bg-slate-500 hover:bg-indigo-600 dark:hover:bg-slate-600 active:bg-indigo-900 dark:active:bg-slate-900" style={{fontSize: 25, fontWeight: 200}}>Log in</button>
          </div>
        </div>
    )
};

export default Login;
