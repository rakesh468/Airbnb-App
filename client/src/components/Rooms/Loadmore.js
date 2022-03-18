import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Button from "@mui/material/Button";
import "./Loadmore.css";

function Loadmore() {
  const state = useContext(GlobalState);

  const [page, setpage] = state.roomsAPI.page;
  const [result] = state.roomsAPI.result;

  return (
    <div className="load_more">
      {result < page * 9 ? (
        ""
      ) : (
        <Button
          size="medium"
          color="inherit"
          variant="contained"
          onClick={() => setpage(page + 1)}
          className="load_button"
        >
          Loadmore
        </Button>
      )}
    </div>
  );
}

export default Loadmore;
