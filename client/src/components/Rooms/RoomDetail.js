import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import "./RoomDetails.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import StripeCheckout from "react-stripe-checkout";
import BasicRating from "../utlis/BasicRating";

function RoomDetail() {
  const state = useContext(GlobalState);
  const params = useParams();
  const [rooms] = state.roomsAPI.rooms;
  const [detailroom, setdetailroom] = useState([]);

  useEffect(() => {
    if (params.id) {
      rooms.forEach((room) => {
        if (room._id === params.id) setdetailroom(room);
      });
    }
  }, [params.id, rooms]);
  if (detailroom.length === 0) return null;

  async function handletoken(token) {
    console.log(token);
  }

  return (
    <>
      <Card className="detail-container">
        <div>
          <img
            src={detailroom.images.url}
            alt={detailroom.title}
            className="detail-image"
          />
        </div>
        <CardContent className="detail-info">
          <h3>{detailroom.title}</h3>
          <br />
          {/* <h3>{detailroom.room_id}</h3> */}
          <h4>Location: {detailroom.location}</h4>
          <br />
          <p className="detail_room">{detailroom.description}</p>

          <BasicRating />

          <h2>${detailroom.price}</h2>

          <CardActions>
            <StripeCheckout
              stripeKey="pk_test_51KZ7tgSCLtg0NGDAlaK5C61XEPGHKE4zH0UbTO6eGe0bd23CKV2Z6tEzWkyvA9Yf3O2Fm2hARJfc9FoshOFiNuFT00q3zNCxlL"
              token={handletoken}
              billingAddress
              name={detailroom.title}
              amount={detailroom.price * 100}
            />
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}

export default RoomDetail;
