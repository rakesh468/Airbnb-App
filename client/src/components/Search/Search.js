import React from "react";
import "./Search.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import Button from "@mui/material/Button";

function Search() {
  const history = useHistory();
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setstartDate(ranges.selection.startDate);
    setendDate(ranges.selection.endDate);
  }
  return (
    <div className="search">
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      <h2>
        Number of guests <PeopleIcon />
      </h2>
      <input min={0} defaultValue={2} type="number" />
      <Button variant="contained" onClick={() => history.push("/rooms")}>
        Search Airbnb
      </Button>
    </div>
  );
}

export default Search;
