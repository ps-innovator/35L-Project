import { useState, useContext, useEffect } from "react";
import { AuthContext, TabContext } from "../App.jsx";
import uclaxLogo from "/uclaxLogo.png";
import CardView from "../components/CardView.jsx";
import SignUp from "../pages/SignUp.jsx";
import Login from "../pages/Login.jsx";

const HomePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { tab, setTab } = useContext(TabContext);
  const [view, setView] = useState("home");

  if (!auth) {

    if (view === "login") {
      setTab(2);
    } else if (view === "signup") {
      setTab(3);
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
            header=""
            shortDescr="Log In to View Posts"
            longDescr=""
            imgsrc={uclaxLogo}
            imgalt="Image of a plane whose trail is a spiral road. Caption is UCLAX."
          />
          <button
              onClick={() => setView("login")}
              className="text-lg leading-tight font-medium text-black dark:text-zinc-400 hover:underline block"
            >
              Returning User? Log In
            </button>
            <button
              onClick={() => setView("signup")}
              className="text-lg leading-tight font-medium text-black dark:text-zinc-400 hover:underline block"
            >
              New User? Sign Up
            </button>
        </div>
      </>
    );
  } else {
    return <></>
  }
};

export default HomePage;
