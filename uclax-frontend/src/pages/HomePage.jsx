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
            header=""
            shortDescr="Log in to view Posts"
            longDescr=""
            imgsrc="https://th.bing.com/th/id/OIP.XVeIdoKEIK7SXK6yN3hEOQHaGs?w=185&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
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
