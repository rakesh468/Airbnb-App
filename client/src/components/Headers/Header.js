import "./Header.css";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import React, { useContext } from "react";
import axios from "axios";
import menu from "./icon/menu.svg";
import close from "./icon/close.svg";
import { useState } from "react";

function Header() {
  const state = useContext(GlobalState);
  const [islogged] = state.userAPI.islogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [Menu, setMenu] = useState(false);

  const logoutuser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstlogin");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_room" className="Home">
            <b>Create Rooms</b>
          </Link>
        </li>
        <li>
          <Link to="/category" className="Home">
            <b>Category</b>
          </Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/" onClick={logoutuser} className="Home">
            <b> Logout</b>
          </Link>
        </li>
      </>
    );
  };
  const stylemenu = {
    left: Menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!Menu)}>
        <img src={menu} alt="menu-bar" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">
            {isAdmin ? (
              "Admin"
            ) : (
              <img
                src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                className="Logo"
                alt="logo"
              />
            )}
          </Link>
        </h1>
      </div>

      <ul style={stylemenu}>
        <li>
          <h4>
            <Link to="/rooms"> {isAdmin ? "Rooms" : "Rooms"} </Link>
          </h4>
        </li>
        {isAdmin && adminRouter()}
        {islogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">
              <h4>
                <b>Login</b>
              </h4>
            </Link>
          </li>
        )}
        <li onClick={() => setMenu(!Menu)}>
          {" "}
          <img src={close} alt="" width="30" className="menu" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
