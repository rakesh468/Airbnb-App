import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  const [islogged, setislogged] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  // const [callback,setcallback]=useState(false)//

  useEffect(() => {
    if (token) {
      const getuser = async () => {
        try {
          const result = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          setislogged(true);
          result.data.role === 1 ? setisAdmin(true) : setisAdmin(false);

          //   console.log(result)//
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getuser();
    }
  }, [token]);

  const useralert = async (room) => {
    if (!islogged) {
      return alert("Please Login to book your Rooms");
    }
  };
  return {
    islogged: [islogged, setislogged],
    isAdmin: [isAdmin, setisAdmin],
    useralert: useralert,
    // callback:[callback,setcallback]
  };
}

export default UserAPI;
