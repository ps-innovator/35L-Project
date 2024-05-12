import { useState, useContext, createContext } from "react";
import "./App.css";
import AppNavBar from "./components/AppNavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";

export const AuthContext = createContext(null);
export const TabContext = createContext(0);

function App() {
  const [auth, setAuth] = useState(null);
  const [tab, setTab] = useState(0);
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
