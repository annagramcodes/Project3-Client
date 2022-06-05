import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ArtistDashboard from "../pages/ArtistDashboard";
import ProfilePage from "../pages/ProfilePage";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return user.profileType === "artist" ? <ArtistDashboard /> : <ProfilePage />;
}

export default Dashboard;
