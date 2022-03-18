import React from "react";
import "./Banner.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Search from "../Search/Search";

function Banner() {
  const [search, setsearch] = useState(false);
  const history = useHistory();
  return (
    <div className="banner">
      <div className="banner_search">
        {search && <Search />}
        <Button
          onClick={() => setsearch(!search)}
          className="banner_searchbuttonbutton"
          variant="contained"
        >
          {search ? "Hide" : "Search Date"}
        </Button>
      </div>
      <div className="banner_info">
        <h1>Getup to Explore the World</h1>
        <h5>Be a Wanderlust in our own World</h5>
        <Button onClick={() => history.push("/rooms")} variant="outlined">
          Explore World
        </Button>
      </div>
    </div>
  );
}

export default Banner;
