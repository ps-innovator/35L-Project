import { useState, useContext } from "react";
import { AuthContext, TabContext } from "../App.jsx";
import carAsset from "/car.png";
import uclaxLogo from "/uclaxLogo.png";
import comm from "/peopleCommunicating.png"
import StaticCardView from "../components/StaticCardView.jsx";

const AboutUs = () => {
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
                  fontSize: 60,
                }}
              >
                What is UCLAX?
              </h1>

              <StaticCardView
                header="Ridesharing Made Simple."
                shortDescr="Made for UCLA Students."
                longDescr="College and flights are expensive enough—getting to the airport shouldn't be.
                Split costs with your fellow Bruins to get to LAX, make travel buddies, and make your flight."
                imgsrc={uclaxLogo}
                imgalt="Image of a plane whose trail is a spiral road. Caption is UCLAX."
                />  
              
              < StaticCardView
                header="Make Travel Buddies!"
                shortDescr="Rate other users."
                longDescr="Travel safely by viewing other users' ratings.
                Enjoyed riding with someone? Send a friend request! 
                If you're looking for a ride, you can search for ride posts made by your friends."
                imgsrc={comm}
                imgalt="Image of a two people talking with a phone between them."
                />

              <StaticCardView
                header="Splitting a ____ has never been easier."
                shortDescr="Customize your profile and post to allow for easy matches."
                longDescr="Select your preferred ridesharing service, your preferred pickup location, and what LAX Terminal you're going to."
                imgsrc={carAsset}
                imgalt="Image of a white car driving."
                />
            </div>
          </>
        );
      } else {
        return <></>
      }
    };

export default AboutUs;