import { useContext, useState } from 'react';
import { AuthContext, TabContext } from '../App';
import { AiFillLock, AiOutlineUser } from 'react-icons/ai';

const SignUp = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const { tab, setTab } = useContext(TabContext);
    const [fullname, setFullname] = useState('');
    const [contactinfo, setContactinfo] = useState ('');
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');
    const [ loginFocused, setLoginFocused ] = useState(false);
    const [ fullnameFocused, setFullnameFocused ] = useState(false);
    const [ contactFocused, setContactFocused ] = useState(false);
    const [ passFocused, setPassFocused ] = useState(false);
    console.log("TEST PAGE")
    const attemptSignUp = async () => {
      console.log("TEST SIGN UP")
      console.log(uname, pwd, fullname, contactinfo)
        const res = await fetch('http://localhost:3000/auth/createaccount', {
            method: 'POST',
            credentials: 'include',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              username: uname,
              fullname: fullname,
              contactinfo: contactinfo,
              password: pwd
            })
        });
        if(res.ok) {
            const json = await res.json();
            setAuth(json);
            setTab(2);
            console.log("works");
        } else {
            console.log("signup failed");
        }
    };
    return (
        <div>
          <h1 className="text-5xl text-black dark:text-white my-[5%] font-medium">
            Sign Up
          </h1>
          
          <div className="flex mb-6 items-center justify-center">
              <div className={`flex items-center border-b w-[30%] transition-opacity duration-50 
              ${fullnameFocused ? "opacity-100 border-blue-500" : "opacity-50 border-gray-800 dark:border-gray-600"}`}>
                  <AiOutlineUser className="text-gray-800 dark:text-gray-400" />
                  <input 
                      name="fullname"
                      placeholder="Full Name" 
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}   
                      onFocus={() => setFullnameFocused(true)}
                      onBlur={() => setFullnameFocused(false)}
                      className="block p-4 text-gray-900 placeholder-gray-600 bg-white focus:outline-none dark:bg-slate-900 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  />
              </div>
          </div>

          <div className="flex mb-6 items-center justify-center">
              <div className={`flex items-center border-b w-[30%] transition-opacity duration-50 
              ${contactFocused ? "opacity-100 border-blue-500" : "opacity-50 border-gray-800 dark:border-gray-600"}`}>
                  <AiOutlineUser className="text-gray-800 dark:text-gray-400" />
                  <input 
                      name="contactinfo"
                      placeholder="Contact Info" 
                      value={contactinfo}
                      onChange={(e) => setContactinfo(e.target.value)}   
                      onFocus={() => setContactFocused(true)}
                      onBlur={() => setContactFocused(false)}
                      className="block p-4 text-gray-900 placeholder-gray-600 bg-white focus:outline-none dark:bg-slate-900 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  />
              </div>
          </div>

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
            <button onClick={attemptSignUp} className=" text-white p-4 h-12 flex items-center justify-center rounded-lg bg-indigo-500 dark:bg-slate-500 hover:bg-indigo-600 dark:hover:bg-slate-600 transition-colors duration-150 active:bg-indigo-900 dark:active:bg-slate-900 text-xl font-extralight">Sign Up</button>
          </div>
        </div>
    )
};

export default SignUp;
