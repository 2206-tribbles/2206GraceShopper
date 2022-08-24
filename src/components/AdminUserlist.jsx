import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Route, Link, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getAllUsers } from "../api_adapter";
import { ProductEdit } from "./index";


const AdminUsers = () => {
        const [allUsers, setAllUsers] =useState([])
      
        useEffect(() => {
          getAllUsers()
            .then((users) => {
              setAllUsers(users);
            })  
            .catch((error) => {
              console.error(error, "Something broke");
            });
        }, []);
        console.log(allUsers, "line14")
      
        const displayUsers = allUsers.map((user, index) => {
          const id = user.id;
          console.log(id, "line33")
          return (
            <div className="adminUsers">
              <h4>First Name: {user.first_name}</h4>
              <h4>Last Name: {user.last_name}</h4>
              <h4>Email: {user.email}</h4>
              <h4>Address: {user.address}</h4>
              <h4>Username: {user.username}</h4>
              <h4>Password: {user.password}</h4>
              <h4>Id: {user.id}</h4>
            </div>
          )
        })
        return(
          <div>{displayUsers}</div>
        )
    }
 
export default AdminUsers;