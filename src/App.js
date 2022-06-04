import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import SignupPage2 from "./pages/SignupPage2";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import ProfilePage from "./pages/ProfilePage";
import RequestPage from "./pages/RequestPage";
import TattoosPage from "./pages/TattoosPage";
import StylesPage from "./pages/StylesPage";
import { ChakraProvider } from "@chakra-ui/react";
import EditProfilePage from "./pages/EditProfilePage";
import ArtistSignUp from "./pages/ArtistSignUp";
import ArtistProfile from "./pages/ArtistProfile";
import ArtistProfilePublic from "./pages/ArtistProfilePublic";
import EditArtistProfile from "./pages/EditArtistProfile";

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
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <ProfilePage />
              </IsPrivate>
            }
          />
          <Route
            path={"/profile/edit/:userId"}
            element={
              <IsPrivate>
                <EditProfilePage />
              </IsPrivate>
            }
          />

          <Route
            path="/signup-artist"
            element={
              <IsPrivate>
                <ArtistSignUp />
              </IsPrivate>
            }
          />

          <Route
            path="/artist/:artistId"
            element={
              <IsPrivate>
                <ArtistProfilePublic />
              </IsPrivate>
            }
          />

          <Route
            path="/artist"
            element={
              <IsPrivate>
                <ArtistProfile />
              </IsPrivate>
            }
          />
          <Route
            path="/artist/edit"
            element={
              <IsPrivate>
                <EditArtistProfile />
              </IsPrivate>
            }
          />

          <Route
            path="/requests"
            element={
              <IsPrivate>
                <RequestPage />
              </IsPrivate>
            }
          />
          <Route
            path="/tattoos"
            element={
              <IsPrivate>
                <TattoosPage />
              </IsPrivate>
            }
          />
          <Route
            path="/styles"
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
