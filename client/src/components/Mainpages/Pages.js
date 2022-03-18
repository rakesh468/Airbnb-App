import React, { useContext } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Rooms from "../Rooms/Rooms";
import { Switch, Route } from "react-router-dom";
import Notfound from "../utlis/Notfound";
import Home from "../Home/Home";
import RoomDetail from "../Rooms/RoomDetail";
import { GlobalState } from "../../GlobalState";
import Categories from "../category/Categories";
import CreateRoom from "../createRoom/CreateRoom";

function Pages() {
  const state = useContext(GlobalState);
  const [islogged] = state.userAPI.islogged;
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/detail/:id" exact component={RoomDetail} />

      <Route path="/rooms" exact component={Rooms} />
      <Route path="/login" exact component={islogged ? Notfound : Login} />
      <Route
        path="/register"
        exact
        component={islogged ? Notfound : Register}
      />
      <Route
        path="/category"
        exact
        component={isAdmin ? Categories : Notfound}
      />
      <Route
        path="/create_room"
        exact
        component={isAdmin ? CreateRoom : Notfound}
      />
      <Route
        path="/edit_room/:id"
        exact
        component={isAdmin ? CreateRoom : Notfound}
      />

      <Route path="*" exact component={Notfound} />
    </Switch>
  );
}

export default Pages;
