import { useState, useContext, createContext, useEffect } from "react";
import Cookies from 'universal-cookie';
import "./App.css";
import AppNavBar from "./components/AppNavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";

export const AuthContext = createContext(null);
export const TabContext = createContext(0);

const cookies = new Cookies();

function App() {
  const [auth, setAuth] = useState(null);
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const authenticateUser = async () => {
      const token = cookies.get('token');
      if (token) {
        const res = await fetch('http://localhost:3000/username', {
          method: 'POST',
          credentials: 'include',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({ token })
        });
        if (res.ok) {
          const json = await res.json();
          setAuth(json.username); // Assuming the response has a username field
          setTab(2);
          console.log("Authenticated successfully");
        } else {
          console.log("Not authenticated");
          setAuth(null);
        }
      }
    };

    authenticateUser();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <TabContext.Provider value={{ tab, setTab }}>
        <AppNavBar />
        <TabManager />
      </TabContext.Provider>
    </AuthContext.Provider>
  );
}

function TabManager() {
  const { tab, setTab } = useContext(TabContext);
  const { auth, setAuth } = useContext(AuthContext);
  console.log(tab);
  if (!auth) {
    switch (tab) {
      case 0:
        return <HomePage />;
      case 1:
        return <Login />;
      case 2:
        return <SignUp />;
      default:
        return <></>;
    }
  } else {
    switch (tab) {
      default:
        return <HomePage />;
    }
  }
}

export default App;
