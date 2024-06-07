import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App.jsx";

const AccountInfo = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [ username, setUsername ] = useState("");
  const [ displayName, setDisplayName ] = useState("");
  const [ contactInfo, setContactInfo ] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateUserInfo = async (put_body) => {
    const token = auth.token;
    return await fetch('http://localhost:3000/auth/edit_user', {
        method: 'PUT',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ token, put_body })
    }).then((data) => data.json());
  };

  const changeDisplayName = async (newName) => {
    const name = newName.target.value;
    setPaymentForm(cinfo);
    const put_body = {
        $set: {
            'preferences.contact_info': name
        }
    };
    await updateUserInfo(put_body);
  };

  const changeContactInfo = async (phoneNumber) => {
    const cinfo = phoneNumber.target.value;
    setPaymentForm(cinfo);
    const put_body = {
        $set: {
            'preferences.contact_info': cinfo
        }
    };
    await updateUserInfo(put_body);
  };

  const getUserInfo = async () => {
    const token = auth.token;
    const res = await fetch('http://localhost:3000/auth/user', {
        method: 'POST',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ token })
    }).then((data) => data.json())
    .then((userInf) => { setUsername(userInf.acc.username); setDisplayName(userInf.acc.fullname); setContactInfo(userInf.acc.contactinfo); console.log(userInf) });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="mt-10 max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div>
        <div className="md:shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
            <img className="object-cover w-full h-full" src="/uclaBruins.webp" alt="Placeholder Profile Picture" />
          </div>
          <div className="shrink md:shrink-0">
        <img
          className="h-48 w-full object-cover md:h-full md:w-48"
          src="/uclaBruins.webp" alt="Placeholder Profile Picture"
        />
      </div>
        <div className = "flex flex-col">
          <h2 className="text-2xl font-bold">Username: {username} </h2>
          <p>Contact Info: {contactInfo}</p>
          <p>Display Name: {displayName} </p>
          </div>
        </div>
      </div>
      <div className="mt-6 mb-6">
        {isEditing ? (
          <>
            <input type="text" className="border border-gray-300 rounded-md p-2 mb-4 w-full" placeholder="New Contact Info" />
            <input type="text" className="border border-gray-300 rounded-md p-2 mb-4 w-full" placeholder="New Display Name" />
          </>
        ) : null}
        <button onClick={toggleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {isEditing ? 'Save Changes' : 'Update Profile Info'}
        </button>
      </div>
    </div>
  );
};

/*
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
*/

export default AccountInfo;
