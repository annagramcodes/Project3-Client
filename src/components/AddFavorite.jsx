import React, { useContext, useEffect, useState } from "react";
import useAxios from "../utils/axios.hook";
import { AuthContext } from "../context/auth.context";
import { Button } from "@chakra-ui/react";
//import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { Icon } from "@chakra-ui/react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

function AddFavorite(props) {
  const { apiClient } = useAxios();
  const { artist } = props;
  const { user } = useContext(AuthContext);
  const [isFavourite, setIsFavourite] = useState(false);

  const userHasFavourite = async () => {
    try {
      const response = await apiClient.get(`/api/profile/${user._id}`);
      const favourites = response.data.favoriteArtists;

      if (
        favourites.length > 0 &&
        favourites.some((el) => el._id === artist._id)
      ) {
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
        <Button variant="outline" px={7} onClick={handleClick}>
          Remove Fav
          <Icon as={RiHeartFill} w={6} h={6} pl={1} color="red.500" />
        </Button>
      ) : (
        <Button variant="outline" px={7} onClick={handleClick}>
          Add Fav <Icon as={RiHeartLine} w={6} h={6} pl={1} color="red.500" />
        </Button>
      )}
    </>
  );
}

export default AddFavorite;
