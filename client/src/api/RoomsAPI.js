import { useState, useEffect } from "react";
import axios from "axios";

function RoomsAPI() {
  const [rooms, setrooms] = useState([]);
  const [callback, setcallback] = useState(false);
  const [category, setcategory] = useState("");
  const [sort, setsort] = useState("");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [result, setresult] = useState(0);

  useEffect(() => {
    const getrooms = async () => {
      const res = await axios.get(
        `/api/rooms?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`
      );
      setrooms(res.data.rooms);
      setresult(res.data.result);
    };
    getrooms();
  }, [callback, category, sort, search, page]);
  return {
    rooms: [rooms, setrooms],
    callback: [callback, setcallback],
    category: [category, setcategory],
    sort: [sort, setsort],
    search: [search, setsearch],
    page: [page, setpage],
    result: [result, setresult],
  };
}

export default RoomsAPI;
