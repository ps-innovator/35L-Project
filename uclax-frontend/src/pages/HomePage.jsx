import { useState, useContext } from "react";
import { AuthContext, TabContext } from "../App.jsx";
import uclaxLogo from "/uclaxLogo.png";
import CardView from "../components/CardView.jsx";

const HomePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { tab, setTab } = useContext(TabContext);

const handleCreatePost = () => {
  // Add your logic for creating a post, such as navigating to a create post page
  console.log("Create Post button clicked");
};

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
            header=""
            shortDescr="Log in to view Posts"
            longDescr=""
            imgsrc={uclaxLogo}
            imgalt="Image of a plane whose trail is a spiral road. Caption is UCLAX."
          />
        </div>
      </>
    );
  } else {
    return <></>
  }
};

export default HomePage;
