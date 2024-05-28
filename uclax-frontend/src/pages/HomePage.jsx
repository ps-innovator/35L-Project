import { useState, useContext } from "react";
import viteLogo from "/vite.svg";
import { AuthContext, TabContext } from "../App.jsx";
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
            header="No Posts Yet"
            shortDescr="Your post Title will appear here"
            longDescr="Your post description will appear here."
            imgsrc="https://www.clker.com/cliparts/2/4/7/1/151619186894840905cute-airplane-clipart.med.png"
            imgalt="Cute airplane clipart"
          />
        </div>
      </>
    );
  } else {
    return <></>
  }
};

export default HomePage;
