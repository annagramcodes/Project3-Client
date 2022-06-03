import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SignupPage2 from "./pages/SignupPage2";
import LoginPage from "./pages/LoginPage";
//import IsPrivate from './components/IsPrivate';
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import ProfilePage from "./pages/ProfilePage";
import RequestPage from "./pages/RequestPage";
import TattoosPage from "./pages/TattoosPage";
import StylesPage from "./pages/StylesPage";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage2 />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />
          <Route
            path="/user-profile"
            element={
              <IsPrivate>
                <ProfilePage />
              </IsPrivate>
            }
          />
          <Route
            path="/user-profile"
            element={
              <IsPrivate>
                <RequestPage />
              </IsPrivate>
            }
          />
          <Route
            path="/user-profile"
            element={
              <IsPrivate>
                <TattoosPage />
              </IsPrivate>
            }
          />
          <Route
            path="/user-profile"
            element={
              <IsPrivate>
                <StylesPage />
              </IsPrivate>
            }
          />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
