import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App.jsx";
import viteLogo from "/vite.svg";

const AccountInfo = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [ carrierPref, setCarrierPref ] = useState("Loading...");
  const [ paymentForm, setPaymentForm ] = useState("");
  
  const updateUserInfo = async (put_body) => {
    const token = auth.token;
    return await fetch('http://localhost:3000/edit_user', {
        method: 'PUT',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ token, put_body })
    }).then((data) => data.json());
  };

  const changeCarrierPref = async () => {
    let newCarrierPref;
    if (carrierPref == "Loading...") return;
    if (carrierPref == "Uber") {
        newCarrierPref = "Lyft";
    } else {
        newCarrierPref = "Uber";
    }

    const put_body = {
        $set: {
            'preferences.ride_pref': newCarrierPref
        }
    };

    setCarrierPref(newCarrierPref);
    await updateUserInfo(put_body);
  };

  const changePaymentPref = async (e) => {
    const ppref = e.target.value;
    setPaymentForm(ppref);
    const put_body = {
        $set: {
            'preferences.payment_form': ppref
        }
    };
    await updateUserInfo(put_body);
  };

  

  const getUserInfo = async () => {
    const token = auth.token;
    const res = await fetch('http://localhost:3000/user', {
        method: 'POST',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ token })
    }).then((data) => data.json())
    .then((userInf) => { setCarrierPref(userInf.acc.preferences.ride_pref); setPaymentForm(userInf.acc.preferences.payment_form); console.log(userInf) });
  };

  useEffect(() => {
    getUserInfo();
  }, []);
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
        My Profile
      </h1>

      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={viteLogo}
              alt={"imgalt"}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-base text-indigo-500 dark:text-white font-semibold">
              {"PREFERENCES"}
            </div>
            <br />
            <div style={{display: "inline-flex", flexDirection: "row", alignItems: "center"}}>
                <a
              href="#"
              className="block text-lg leading-tight font-medium text-black dark:text-zinc-400 hover:underline"
            >
                    {"Preferred carrier:"}
                </a>
                <button onClick={changeCarrierPref}>
                    <p className="pl-2 text-slate-500 text-xl !text-xl font-medium text-blue-500 hover:text-blue-200">
                        {carrierPref}
                    </p>
                </button>
            </div>
            <div style={{display: "inline-flex", flexDirection: "row", alignItems: "center"}}>
                <a
              href="#"
              className="block text-lg font-medium text-black dark:text-zinc-400 hover:underline pr-2"
            >
                    {"Payment:"}
                </a>
                <input className="text-slate-500 text-xl !text-xl font-medium text-blue-500" value={paymentForm} onChange={changePaymentPref} style={{width: "50%"}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
