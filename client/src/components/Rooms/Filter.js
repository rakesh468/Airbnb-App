import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import "./Filter.css";

function Filter() {
  const state = useContext(GlobalState);
  // const [rooms,setrooms]=state.roomsAPI.rooms//
  const [category, setcategory] = state.roomsAPI.category;
  const [sort, setsort] = state.roomsAPI.sort;
  const [search, setsearch] = state.roomsAPI.search;
  const [categories] = state.categoriesAPI.categories;

  const handlecategory = (event) => {
    setcategory(event.target.value);
    setsearch("");
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filter: </span>
        <select name="category" value={category} onChange={handlecategory}>
          <option value="">All Rooms</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={search}
        placeholder="Search Hotel"
        onChange={(event) => setsearch(event.target.value.toLowerCase())}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select value={sort} onChange={(event) => setsort(event.target.value)}>
          <option value="">All Rooms</option>
          <option value="">Newest</option>
          <option value="sort=-price">Price: High-Low</option>
          <option value="sort=price"> Price: Low-High</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
