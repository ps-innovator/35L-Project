import { useState, useContext } from 'react';
import { AuthContext, TabContext } from '../App';
import { AiFillLock, AiOutlineUser } from 'react-icons/ai';

const Login = () => {
    //Referenced documentation for input tag: https://flowbite.com/docs/forms/input-field/
    const { auth, setAuth } = useContext(AuthContext);
    const { tab, setTab } = useContext(TabContext);
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');
    const [ loginFocused, setLoginFocused ] = useState(false);
    const [ passFocused, setPassFocused ] = useState(false);
    const [error, setError] = useState('')
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
            setError("Username or password is incorrect.")
        }
    };

    return (
        <div className='justify-center'>
          <h1 className="text-5xl text-black dark:text-white my-[5%] font-medium">
            Login
          </h1>
          <div className="flex mb-6 items-center justify-center">
            <div className={`flex items-center border-b w-[30%] transition-opacity duration-50 
            ${loginFocused ? "opacity-100 border-blue-500" : "opacity-50 border-gray-800 dark:border-gray-600"}`}>
              <AiOutlineUser className="text-gray-800 dark:text-gray-400" />
              <input 
                name="uname"
                placeholder="Username" 
                value={uname}
                onChange={(e) => setUname(e.target.value)}   
                onFocus={() => setLoginFocused(true)}
                onBlur={() => setLoginFocused(false)}
                className="block p-4 text-gray-900 placeholder-gray-600 bg-white focus:outline-none dark:bg-slate-900 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex mb-6 items-center justify-center">
            <div className={`flex items-center border-b w-[30%] transition-opacity duration-50 
            ${passFocused ? "opacity-100 border-blue-500" : "opacity-50 border-gray-800 dark:border-gray-600"}`}>
              <AiFillLock className="text-gray-800 dark:text-gray-400" />
              <input 
                name="pwd"
                placeholder="Password" 
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}   
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
                className="block p-4 text-gray-900 placeholder-gray-600 bg-white focus:outline-none dark:bg-slate-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex mb-6 items-center justify-center">
            <button onClick={attemptLogin} className=" text-white p-4 h-12 flex items-center justify-center rounded-lg bg-indigo-500 dark:bg-slate-500 hover:bg-indigo-600 dark:hover:bg-slate-600 transition-colors duration-150 active:bg-indigo-900 dark:active:bg-slate-900 text-xl font-extralight">Log in</button>
          </div>
          {error && (
            <div className="flex items-center justify-center mt-4">
              <div className="max-w-s p-2 bg-red-200 text-red-700 border border-red-400 rounded">
                {error}
              </div>
            </div> )}
        </div>
    )
};

export default Login;
