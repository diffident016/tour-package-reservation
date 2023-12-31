import React, { Component } from "react";
import "./DashboardStyles.css";
import Tourism from "./Tourism.png";
import sigiriya2 from "./sigiriya2.jpg";
import sigiriya3 from "./sigiriya3.jpg";

class Dashboard extends Component {
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
            <h1 className="d">About Us</h1>
            <br></br>
            <div className="container text-center">
              <img src={Tourism}></img>
            </div>
            <br></br>
            <br></br>
            <p>
            Tourism Act of 2009 known as RA 9593, declares tourism as an indispensable 
            element of the national economy and an industry of national interest and importance, 
            which must be harnessed as an engine of socio-economic growth and cultural affirmation 
            to generate investment, foreign exchange, and employment,and to continue to mold an 
            enhanced sense of national pride for all Filipinos.
              <br></br>
              <br></br>
              The City Tourism Operations Division of the City Mayor’s Office in line with the mandate of the 
              Tourism Act of 2009 recognizes the importance of Tourism as an engine for sustainable development.
              <br></br>
              <br></br>
              <br></br>
            </p>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
