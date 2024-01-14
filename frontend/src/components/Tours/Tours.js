import React, { Component } from "react";
import "./Tours.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import add from "./add.png";

const initialState = {
  tname: "",
  tdescription: "",
  tnumber: "",

  tnameerror: "",
  tdescriptionerror: "",
  tnumbererror: "",

  username: "",
};

class Tours extends React.Component {
  state = initialState;

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  validate = () => {
    let tnameerror = "";
    let tdescriptionerror = "";
    let tnumbererror = "";

    if (!this.state.tname) {
      tnameerror = "This field is required";
    }

    if (!this.state.tdescription) {
      tdescriptionerror = "This field is required";
    }
    if (!this.state.tnumber) {
      tnumbererror = "This field is required";
    }

    if (tnameerror || tdescriptionerror || tnumbererror) {
      this.setState({
        tnameerror,
        tdescriptionerror,
        tnumbererror,
      });
      return false;
    }
    swal("Package Details Added Successfully!", "No warnings! ", "success");
    return true;
  };

  onSubmitHandler = (e) => {
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state.tname);
      console.log(this.state.tdescription);
      console.log(this.state.tnumber);

      //clear form
      this.setState(initialState);
    }

    if (
      this.state.tname == null &&
      this.state.tdescription == null &&
      this.state.tnumber == null
    ) {
      return alert("Cannot submit empty fields");
    }
    fetch("http://localhost:5000/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        tname: this.state.tname,
        tdescription: this.state.tdescription,
        tnumber: this.state.tnumber,
      }),
    })
      .then(function (callback) {
        console.log(callback.json());
      })
      .catch((error) => {
        console.log(error);
      });
    e.preventDefault();
    this.setState({
      tname: "",
      tdescription: "",
      tnumber: "",
    });
  };

  componentDidMount() {
    console.log(localStorage.getItem("authToken"));
    if (!localStorage.getItem("authToken")) {
      window.location.href = "/login";
    }

    this.setState({
      username: localStorage.getItem("username"),
    });
  }

  render() {
    return (
      <div className="container">
        <Link to="/edit">
          <button className="btn btn-danger ml-2">
            <i className="fa fa-trash-o"></i>&nbsp; Update/Delete Tourist Spot
          </button>
        </Link>
        <form onSubmit={this.formSubmitHandler}>
          <div className="container text-center">
            <br></br>
            <br></br>
            <br></br>

            <h1 className="o">
              {" "}
              <img src={add}></img>&nbsp;Add Tourist Spot
            </h1>
            <br></br>
            <br></br>
            <br></br>
          </div>

          <div className="container text-center mt-3">
            <form onSubmit={this.onSubmitHandler}>
              <div className="form-group">
                <label className="text-left">
                  <i class="fa fa-suitcase" aria-hidden="true"></i>&nbsp;Tourist Spot
                  Name
                </label>
                <input
                  name="tname"
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="Tour Name"
                  className="form-control"
                  aria-describedby="emailHelp"
                  value={this.state.tname}
                  required
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.tnameerror}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  <i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;
                  Description
                </label>
                <input
                  name="tdescription"
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="Tour Description"
                  className="form-control"
                  value={this.state.tdescription}
                  required
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.tdescriptionerror}
                </div>
              </div>

              {/* <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  <i class="fa fa-money" aria-hidden="true"></i>&nbsp;Price of
                  the Tour
                </label>
                <input
                  name="price"
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="Price of the Tour"
                  className="form-control"
                  value={this.state.price}
                  required
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.priceerror}
                </div>
              </div> */}

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                  &nbsp;Tourist Spot Number
                </label>
                <input
                  name="tnumber"
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="Tour Number"
                  className="form-control"
                  value={this.state.tnumber}
                  required
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.tnumbererror}
                </div>
              </div>

              <br></br>
              <br></br>
              <div className="form-group">
                <button
                  className="btn btn-danger"
                  onClick={this.onSubmitHandler}
                >
                  <i className="fa fa-send"></i>&nbsp; Submit
                </button>
                <Link to="/view">
                  <button className="btn btn-info ml-2">
                    <i className="fa fa-arrow-left"></i>&nbsp; Back to Tourist Spots
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </form>
      </div>
    );
  }
}

export default Tours;
