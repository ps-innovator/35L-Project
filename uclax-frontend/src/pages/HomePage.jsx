import { useState, useContext, useEffect } from "react";
import { AuthContext, TabContext } from "../App.jsx";
import uclaxLogo from "/uclaxLogo.png";
import CardView from "../components/CardView.jsx";

const HomePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { tab, setTab } = useContext(TabContext);
  const [view, setView] = useState("home");
  const [ userInfo, setUserInfo ] = useState({});
	const [ myRides, setMyRides ] = useState([]);
	const [ requestsToMe, setRequestsToMe ] = useState([]);
	const [ requestsByMe, setRequestsByMe ] = useState([]);
	
				const fetchUserInfo = async () => {
					if (!auth.token) return;
					await fetch("http://localhost:3000/auth/user", {
						method: "POST",
						credentials: "include",
						header: { "content-type": "application/json"},
						body: JSON.stringify({ token: auth.token })
					}).then(data => data.json())
					.then(data => setUserInfo(data.acc))
					await fetch(`http://localhost:3000/auth/riderequests?userId=${userInfo._id ? userInfo._id : ''}`)
								.then(data => data.json())
								.then(data => { setMyRides(data); console.log(data); } );
				};

    useEffect(() => {
			fetchUserInfo();
    }, [auth]);

  if (!auth || !auth.token) {

    if (view === "login") {
      setTab(1);
    } else if (view === "signup") {
      setTab(2);
    }

    return (
      <>
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
            Welcome to UCLAX!
            </h1>
          <CardView
            shortDescr1="Log in to view posts"
            imgsrc={uclaxLogo}
            imgalt="Image of a plane whose trail is a spiral road. Caption is UCLAX."
          />
           <div style={{ marginTop: "20px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={() => setView("login")}
              className="text-lg leading-tight font-medium text-black dark:text-zinc-400 hover:underline"
              style={{ marginBottom: "10px" }}
            >
              Returning User? Log In
            </button>
            <button
              onClick={() => setView("signup")}
              className="text-lg leading-tight font-medium text-black dark:text-zinc-400 hover:underline"
            >
              New User? Sign Up
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (<>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-white">
	    <h1 className="text-center text-4xl font-bold my-8">My Rides</h1>
	    { userInfo.rides ?
	    <div className="grid grid-cols-1 gap-4">
	    	{userInfo.rides.map((ride) => {

		})} 

	    </div> : <h5 className="dark:text-white text-black">Loading...</h5> }
      </div>
    </>);
  }
};

export default HomePage;
