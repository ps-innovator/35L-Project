import { useState, useContext } from "react";
import viteLogo from "/vite.svg";
import { AuthContext, TabContext } from "../App.jsx";
import CardView from "../components/CardView.jsx";

const HomePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { tab, setTab } = useContext(TabContext);

  if (!auth) {
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
            header="Feature 1"
            shortDescr="Short description 1"
            longDescr="Much longer description for feature 1.
            Change image on the left too to mean something lol."
            imgsrc={viteLogo}
            imgalt="Image alt"
            />
        </div>
      </>
    );
  } else {
    return <></>
  }
};

export default HomePage;
