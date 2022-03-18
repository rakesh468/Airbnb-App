import { useState, useEffect } from "react";
import axios from "axios";

function CategoriesAPI() {
  const [categories, setcategories] = useState([]);
  const [callback, setcallback] = useState(false);

  useEffect(() => {
    const getcategories = async () => {
      const result = await axios.get("/api/category");
      console.log(result);
      setcategories(result.data);
    };
    getcategories();
  }, [callback]);
  return {
    categories: [categories, setcategories],
    callback: [callback, setcallback],
  };
}

export default CategoriesAPI;
