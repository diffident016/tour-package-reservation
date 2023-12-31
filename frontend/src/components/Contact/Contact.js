import React, { Component } from "react";
import contact from "./contact.png";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
    };
  }

  render() {
    return (
      <div className="q">
        <div className="container">
          <div className="container text-left">
            <br></br>
            <br></br>
            <h1 className="d">
              {" "}
              <img src={contact}></img>&nbsp;Contact Us
            </h1>
            <br></br>

            <h1>Malabalay City Tourism Office</h1>
            <br></br>
            <h5>
              {" "}
              <i class="fa fa-phone" aria-hidden="true"></i>&nbsp;Phone Number
              <br></br>
              <br></br>813-3404/0997-850-4913{" "}
            </h5>
            <br></br>
            <h5>
              {" "}
              <i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;Email
              <br></br>
              <br></br>cgmtourism.nada@gmail.com{" "}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
