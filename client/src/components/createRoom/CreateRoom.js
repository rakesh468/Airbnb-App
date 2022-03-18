import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import "./CreateRoom.css";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { useHistory, useParams } from "react-router-dom";

const initialstate = {
  room_id: "",
  title: "",
  price: 0,
  description: "",
  category: "",
  location: "",
  _id: "",
};

function CreateRoom() {
  const history = useHistory();
  const param = useParams();
  const state = useContext(GlobalState);
  const [room, setroom] = useState(initialstate);
  const [categories] = state.categoriesAPI.categories;
  const [images, setimages] = useState(false);
  const [token] = state.token;
  const [isAdmin] = state.userAPI.isAdmin;
  const [rooms] = state.roomsAPI.rooms;
  const [onedit, setonedit] = useState(false);
  const [callback, setcallback] = state.roomsAPI.callback;

  const styleupload = {
    display: images ? "block" : "none",
  };

  useEffect(() => {
    if (param.id) {
      setonedit(true);
      rooms.forEach((room) => {
        if (room._id === param.id) {
          setroom(room);
          setimages(room.images);
        }
      });
    } else {
      setonedit(false);
      setroom(initialstate);
      setimages(false);
    }
  }, [param.id, rooms]);

  const handleupload = async (event) => {
    event.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an Admin");

      const file = event.target.files[0];

      if (!file) return alert("file not Exist");

      if (file.size > 1024 * 1024) return alert("Size is not large");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File Format is incorrect");

      let formData = new FormData();
      formData.append("file", file);

      const result = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setimages(result.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handledestory = async () => {
    try {
      if (!isAdmin) return alert("You are not an Admin");
      await axios.post(
        "/api/destory",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );

      setimages(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handlechangeInput = (event) => {
    const { name, value } = event.target;
    setroom({ ...room, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isAdmin) return alert("you are not an admin");
      if (!images) return alert("No images uploaded");
      if (onedit) {
        await axios.put(
          `/api/rooms/${room._id}`,
          { ...room, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/rooms",
          { ...room, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setcallback(!callback);

      history.push("/rooms");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="create_room">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleupload} />
        <div id="file_img" style={styleupload}>
          <img src={images ? images.url : ""} alt="" />
          <span onClick={handledestory}>X</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="room_id">Room Id:</label>
          <input
            type="text"
            id="room_id"
            name="room_id"
            required
            value={room.room_id}
            onChange={handlechangeInput}
            disabled={onedit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={room.title}
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            name="description"
            required
            value={room.description}
            onChange={handlechangeInput}
            rows="1"
          />
        </div>
        <div className="row">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={room.location}
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            required
            value={room.price}
            onChange={handlechangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="category">Category:</label>

          <select
            name="category"
            value={room.category}
            onChange={handlechangeInput}
          >
            <option value="">Please select Category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <CardActions>
          <Button variant="contained" size="small" type="submit">
            {onedit ? "update" : "Create"}
          </Button>
        </CardActions>
      </form>
    </div>
  );
}

export default CreateRoom;
