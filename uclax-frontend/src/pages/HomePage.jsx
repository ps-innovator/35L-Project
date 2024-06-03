import { useState, useContext, useEffect } from "react";
import { AuthContext, TabContext } from "../App.jsx";
import uclaxLogo from "/uclaxLogo.png";
import CardView from "../components/CardView.jsx";

const HomePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { tab, setTab } = useContext(TabContext);
  const [view, setView] = useState("home");

  if (!auth) {

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
    return <></>
  }
};

export default HomePage;
