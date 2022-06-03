import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ProfilePage() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      {isLoggedIn && (
        <>
          <Link to="/">
            <button>Homepage</button>
          </Link>
          <Link to={`/profile/edit/${user._id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={logoutUser}>Logout</button>
          <p>Welcome {user.username}</p>
          <p>{user.email}</p>
          <img src={user.imageUrl} alt="" />
        </>
      )}
    </div>
  );
}

export default ProfilePage;
