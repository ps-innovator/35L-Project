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
          <h1 className="text-5xl text-black dark:text-white my-[5%] font-medium">
            Login
          </h1>
          <div className="flex mb-6 items-center justify-center">
            <input name="uname"
            placeholder="Username" 
            value={uname}
            onChange={(e) => setUname(e.target.value)}   
            className="block opacity-50 focus:opacity-100 transition-opacity duration-150 focus:appearance-none w-[30%] p-4 text-gray-900 placeholder-gray-600 border-b border-gray-800 bg-white focus:outline-none dark:bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex mb-6 items-center justify-center">
            <input name="pwd"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            type="password"
            className="block opacity-50 focus:opacity-100 transition-opacity duration-150 focus:appearance-none w-[30%] p-4 text-gray-900 placeholder-gray-600 border-b border-gray-800 bg-white focus:outline-none dark:bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex mb-6 items-center justify-center">
            <button onClick={attemptLogin} className=" text-white p-4 h-12 flex items-center justify-center rounded-lg bg-indigo-500 dark:bg-slate-500 hover:bg-indigo-600 dark:hover:bg-slate-600 transition-colors duration-150 active:bg-indigo-900 dark:active:bg-slate-900 text-xl font-extralight">Log in</button>
          </div>
        </div>
    )
};

export default Login;
