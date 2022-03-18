import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Btnrender from "./Btnrender";
import BasicRating from "../utlis/BasicRating";

import "./RoomItem.css";

function RoomItem({ room, isAdmin, deleteRoom, handlecheck }) {
  return (
    <Card className="searchresult">
      {isAdmin && (
        <input
          type="checkbox"
          checked={room.checked}
          onChange={() => handlecheck(room._id)}
        />
      )}
      <img src={room.images.url} alt={room.title} />
      <CardContent className="searchresult_info">
        <h2>{room.title}</h2>
        <h3>
          <b>Location: </b>
          {room.location}
        </h3>

        <p className="description_p">
          <b>Facilities: </b>
          {room.description}
        </p>
        <BasicRating />

        <h3>
          <b>Price:</b>${room.price}
        </h3>
        <Btnrender room={room} deleteRoom={deleteRoom} />
      </CardContent>
    </Card>
  );
}

export default RoomItem;
