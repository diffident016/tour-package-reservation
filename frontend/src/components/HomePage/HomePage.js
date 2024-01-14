import React, { Component, useEffect } from "react";
import "./HomePageStyles.css";
import Bukidnon from "./Bukidnon.jpg";
import kitanglad from "./kitanglad.jpg";
import agyo from "./agyo.jpg";
import mushroom from "./mushroom.jpg";

function HomePage() {

  return (
    <div className="container">
      <br></br>
      <div className={"justify-content-center mt-5 mb-5"}>
        <h1 className="rr">
          <img src={Bukidnon}></img>&nbsp;"Cool Place Warm People"
        </h1>
      </div>
      <br></br>
      <div className="container text-left">
        <h2>Adventure Now!</h2>
        <br></br>
        <h4>MT. KITANGLAD AGRI TOURISM FARM</h4>
      </div>
      <br></br>
      <div className="container text-center">
        <img src={kitanglad}></img>
      </div>
      <br></br>
      <div className="container text-left">
      </div>

      <div className="container text-left">
        <h4>AGYO FARM</h4>
      </div>
      <div className="container text-center">
        <img src={agyo}></img>
      </div>
      <br></br>

      <div className="container text-left">
        <h4>MUSHROOM CITY</h4>
      </div>
      <div className="container text-center">
        <img src={mushroom}></img>
      </div>
      <br></br>


      <br></br>


    </div>
  )
}

export default HomePage