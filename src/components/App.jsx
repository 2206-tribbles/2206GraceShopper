import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { Home } from "./index";

const App = () => {

    return (<>
        {/* <NavBar /> */}
        {/* <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <Profile
                setMessageFlag={setMessageFlag}
                setSinglePost={setSinglePost}
                singlePost={singlePost}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/routines" element={<Routines user={user}/>} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityMod />} />
        </Routes> */} <div>"Hello World</div>
      </>);
};

export default App;