import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import RoomItem from "../utlis/RoomItem";
import axios from "axios";
import Button from "@mui/material/Button";
import "./Rooms.css";
import Filter from "./Filter";
import Loadmore from "./Loadmore";

function Rooms() {
  const state = useContext(GlobalState);
  const [rooms, setrooms] = state.roomsAPI.rooms;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setcallback] = state.roomsAPI.callback;
  const [ischeck, setischeck] = useState(false);

  const handlecheck = (id) => {
    rooms.forEach((room) => {
      if (room._id === id) room.checked = !room.checked;
    });
    setrooms([...rooms]);
  };

  const deleteRoom = async (id, public_id) => {
    console.log({ id, public_id });

    try {
      const destoryimage = axios.post(
        "/api/destory",
        { public_id },
        { headers: { Authorization: token } }
      );
      const deleteRoom = axios.delete(`/api/rooms/${id}`, {
        headers: { Authorization: token },
      });

      await destoryimage;
      await deleteRoom;
      setcallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const checkall = () => {
    rooms.forEach((room) => {
      room.checked = !room.checked;
    });
    setrooms([...rooms]);
    setischeck(!ischeck);
  };

  const deleteall = () => {
    rooms.forEach((room) => {
      if (room.checked) deleteRoom(room._id, room.images.public_id);
    });
  };

  return (
    <>
      <Filter />
      {isAdmin && (
        <div className="delete-all">
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={deleteall}
          >
            Delete All
          </Button>
          <span>
            <b>Select All</b>
          </span>
          <input type="checkbox" checked={ischeck} onChange={checkall} />
        </div>
      )}

      <div className="rooms">
        {rooms.map((room) => {
          return (
            <RoomItem
              key={room._id}
              room={room}
              isAdmin={isAdmin}
              deleteRoom={deleteRoom}
              handlecheck={handlecheck}
            />
          );
        })}
      </div>
      <Loadmore />
    </>
  );
}

export default Rooms;
