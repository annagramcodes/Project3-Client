import "./App.css";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import SignupPage2 from "./pages/SignupPage2";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import ProfilePage from "./pages/ProfilePage";
// import RequestPage from "./pages/RequestPage";

import StylesPage from "./pages/StylesPage";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import EditProfilePage from "./pages/EditProfilePage";
import ArtistSignUp from "./pages/ArtistSignUp";
import ArtistPage from "./pages/ArtistPage";
import EditArtist from "./pages/EditArtist";
import Dashboard from "./components/Dashboard";
import RequestCreate from "./pages/RequestCreate";
import RequestDetailsPage from "./pages/RequestDetailsPage";
import AllArtistsPage from "./pages/AllArtistsPage";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  return (
    <ChakraProvider>
      <Flex bg="gray.50" minH="100vh" flexDirection="column" className="App">
        <>
          {location.pathname === "/login" ||
          location.pathname === "/signup-artist" ? null : (
            <Navbar />
          )}
        </>

        {/* <Navbar /> */}
        <Routes>
          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage2 />
              </IsAnon>
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <ProfilePage />
              </IsPrivate>
            }
          />
          <Route
            path="/profile/edit/:userId"
            element={
              <IsPrivate>
                <EditProfilePage />
              </IsPrivate>
            }
          />

          <Route
            path="/artist"
            element={
              <IsPrivate>
                <AllArtistsPage />
              </IsPrivate>
            }
          />

          <Route
            path="/artist/:artistId"
            element={
              <IsPrivate>
                <ArtistPage />
              </IsPrivate>
            }
          />

          <Route
            path="/dashboard"
            element={
              <IsPrivate>
                <Dashboard />
              </IsPrivate>
            }
          />
          <Route
            path="/artist/edit"
            element={
              <IsPrivate>
                <EditArtist />
              </IsPrivate>
            }
          />

          {/* <Route
            path="/requests"
            element={
              <IsPrivate>
                <RequestPage />
              </IsPrivate>
            }
          /> */}
          <Route
            path="/requests/:artistId/create"
            element={
              <IsPrivate>
                <RequestCreate />
              </IsPrivate>
            }
          />
          <Route
            path="/requests/:requestId"
            element={
              <IsPrivate>
                <RequestDetailsPage />
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
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
