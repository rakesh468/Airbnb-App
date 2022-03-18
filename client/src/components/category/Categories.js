import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import "./Category.css";
import Button from "@mui/material/Button";
import axios from "axios";
import CardActions from "@mui/material/CardActions";

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setcategory] = useState("");
  const [token] = state.token;
  const [callback, setcallback] = state.categoriesAPI.callback;
  const [onedit, setonedit] = useState(false);
  const [id, setid] = useState("");

  const createcategory = async (event) => {
    event.preventDefault();
    try {
      if (onedit) {
        const result = await axios.put(
          `/api/category/${id}`,
          { name: category },
          { headers: { Authorization: token } }
        );

        alert(result.data.msg);
      } else {
        const result = await axios.post(
          "/api/category",
          { name: category },
          { headers: { Authorization: token } }
        );

        alert(result.data.msg);
      }
      setonedit(false);
      setcategory("");
      setcallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const editcategory = async (id, name) => {
    setid(id);
    setcategory(name);
    setonedit(true);
  };

  const deletecategory = async (id) => {
    try {
      const result = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(result.data.msg);
      setcallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="categories">
      <form className="category_form" onSubmit={createcategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(event) => setcategory(event.target.value)}
        />
        <CardActions>
          <Button variant="contained" size="medium" type="submit">
            {onedit ? "Update" : "Create"}
          </Button>
        </CardActions>
      </form>
      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              <Button
                variant="contained"
                onClick={() => editcategory(category._id, category.name)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deletecategory(category._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
