import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { GlobalState } from "../../GlobalState";
import CardActions from "@mui/material/CardActions";

function Btnrender({ room, deleteRoom }) {
  const state = useContext(GlobalState);

  const [isAdmin] = state.userAPI.isAdmin;
  const useralert = state.userAPI.useralert;

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <CardActions>
            <Button variant="contained" size="medium" color="primary">
              <Link id="btn_buy" to={`edit_room/${room._id}`}>
                {" "}
                EDIT
              </Link>
            </Button>
            <Button variant="contained" size="medium" color="error">
              <Link
                id="btn_buy"
                to="#!"
                onClick={() => deleteRoom(room._id, room.images.public_id)}
              >
                {" "}
                DELETE
              </Link>
            </Button>
          </CardActions>
        </>
      ) : (
        <>
          <CardActions>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={() => useralert()}
            >
              {" "}
              <Link id="btn_view" to={`/detail/${room._id}`}>
                View
              </Link>
            </Button>
          </CardActions>
        </>
      )}
    </div>
  );
}

export default Btnrender;
