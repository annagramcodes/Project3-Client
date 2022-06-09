import React, { useContext, useEffect, useState } from "react";
import useAxios from "../utils/axios.hook";
import { AuthContext } from "../context/auth.context";
import { Button } from "@chakra-ui/react";

function AddFavorite(props) {
  const { apiClient } = useAxios();
  const { artist } = props;
  const { user } = useContext(AuthContext);
  const [isFavourite, setIsFavourite] = useState(false);

  const userHasFavourite = async () => {
    try {
      const response = await apiClient.get(`/api/profile/${user._id}`);
      const favourites = response.data.favoriteArtists;

      if (favourites.length > 0) {
        favourites.some((el) => el._id === artist._id);
        setIsFavourite(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      const body = { userId: user._id, artistId: artist._id };
      const response = await apiClient.put("/api/addFavorite", body);
      console.log(response.data);
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userHasFavourite();
  }, [isFavourite]);

  return (
    <>
      {isFavourite ? (
        <Button onClick={handleClick}>Remove Fav</Button>
      ) : (
        <Button onClick={handleClick}>Add Fav</Button>
      )}
    </>
  );
}

export default AddFavorite;
