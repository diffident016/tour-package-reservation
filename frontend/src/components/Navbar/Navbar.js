import React, { Component } from "react";
import "./NavbarStyles.css";
import { Link } from "react-router-dom";
import saka from "./saka.jpg";
import swal from "sweetalert";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    if (localStorage.getItem("authToken")) {
      localStorage.clear();
      window.location.href = "/login";
      swal("Logged Out!", "Successfully Logged Out", "success");
      window.open("http://localhost:5000/auth/logout", "_self");
    } else {
      swal("Not Logged In!", "Please Login first", "warning");
    }
  }

  render() {
    return (
      <nav className="navbar p-3 mb-2 navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand mr-3">
          {" "}
          <img src={saka}></img>&nbsp; Malaybalay City Tourism
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="r"></div>
          <div className="navbar-buttons ml-auto">
            <Link to="/admin">
              <button className="btn btn-success mr-2" type="submit">
                <i class="fa fa-home" aria-hidden="true"></i>&nbsp; Dashboard
              </button>
            </Link>
            <Link to="/login">
              <button className="btn btn-danger mr-2" type="submit">
                <i class="fa fa-user" aria-hidden="true"></i>&nbsp; Login
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="btn btn-warning mr-2" type="submit">
                <i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; AboutUs
              </button>
            </Link>
            <Link to="/">
              <button className="btn btn-success mr-2" type="submit">
                <i class="fa fa-home" aria-hidden="true"></i>&nbsp; Home
              </button>
            </Link>

            <Link to="/contact">
              <button className="btn btn-light mr-2" type="submit">
                <i class="fa fa-phone" aria-hidden="true"></i>&nbsp; ContactUs
              </button>
            </Link>

            <Link to="/add">
              <button className="btn btn-info mr-2" type="submit">
                <i class="fa fa-tag" aria-hidden="true"></i>&nbsp;
                Reservation
              </button>
            </Link>

            <Link to="/view">
              <button className="btn btn-success mr-2" type="submit">
                <i class="fa fa-car" aria-hidden="true"></i>&nbsp; TouristSpots
              </button>
            </Link>

            <button
              className="btn btn-warning mr-2"
              type="submit"
              onClick={() => this.logout()}
            >
              <i class="fa fa-send" aria-hidden="true"></i>&nbsp; Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
