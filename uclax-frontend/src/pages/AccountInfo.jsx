import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App.jsx";

const AccountInfo = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newContactInfo, setNewContactInfo] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");

  const toggleEdit = () => {
    if (isEditing) {
      if (newDisplayName != "") {
        changeDisplayName(newDisplayName);
      }
      if(newContactInfo != "") {
        changeContactInfo(newContactInfo);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChangeContactInfo = (newInfo) => {
    setNewContactInfo(newInfo.target.value);
  };

  const handleChangeDisplayName = (newName) => {
    setNewDisplayName(newName.target.value);
  };

  const changeContactInfo = async (cinfo) => {
    setContactInfo(cinfo);
    setNewContactInfo("")
    const put_body = {
        $set: {
          'contactinfo': cinfo
        }
    };
    await updateUserInfo(put_body);
  };

  const changeDisplayName = async (newName) => {
    setDisplayName(newName);
    setNewDisplayName("")
    const put_body = {
        $set: {
          'fullname': newName
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

  const updateUserInfo = async (put_body) => {
    console.log(put_body);
    const token = auth.token;
    return await fetch('http://localhost:3000/auth/edit_user', {
        method: 'PUT',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ token, put_body })
    }).then((data) => data.json());
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
    <h1 className="text-2xl text-black dark:text-white"
            style={{
              marginTop: "5%",
              marginBottom: "5%",
              fontWeight: "500",
              fontSize: 45,
            }}
            >
            My Profile
            </h1>

    <div className="mt-10 max-w-xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div className="flex">
      {/* Profile picture section */}
      <div className="bg-gray-100 dark:bg-slate-800 flex flex-col items-center p-6">
        <div className="rounded-full bg-white">
          <img
            className="h-48 w-48 rounded-full object-cover"
            src="/uclaBruins.webp"
            alt="Placeholder Profile Picture"
          />
        </div>
        <button
          onClick={toggleEdit}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {isEditing ? 'Save Changes' : 'Update Profile Info'}
        </button>
      </div>

      {/* Profile info section */}
      <div className={`flex-1 flex flex-col ${isEditing ? 'p-6' : 'items-center justify-center'}`}>
        <h2 className={`font-bold text-black dark:text-white mb-2 ${isEditing ? "mt-4 text-2xl" : "text-4xl"}`}>{username} </h2>
        <p className={`text-black dark:text-slate ${isEditing ? "text-base" : "text-xl mt-2 mb-1"}`}>
          <span className="font-semibold"> Contact Info: </span> {contactInfo}
        </p>
        <p className={`text-black dark:text-slate ${isEditing ? "text-base" : "text-xl"}`}>
          <span className="font-semibold"> Display Name: </span> {displayName}
        </p>
        
        {isEditing && (
          <div className="mt-6">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 mb-4 w-full"
              placeholder="New Contact Info"
              value={newContactInfo}
              onChange={handleChangeContactInfo}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 mb-4 w-full"
              placeholder="New Display Name"
              value={newDisplayName}
              onChange={handleChangeDisplayName}
            />
          </div>
        )}
      </div>
    </div>
  </div>
  </div>
  );
};

export default AccountInfo;