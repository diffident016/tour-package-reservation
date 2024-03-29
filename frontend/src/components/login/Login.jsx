import React, { Component, createRef } from "react";
import "./loginStyles.css";
import { fakeAuth } from "./MyHome";
import swal from "sweetalert";
import person from "./person.png";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import fbIcon from './fb.png';
import googleIcon from './google.png'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminEmail: "",
      adminPassword: "",
      recaptchaRef: null
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem('authToken'));
    if (localStorage.getItem('authToken')) {
      window.location.href = "/tours"
    }


  }



  onSubmitHandler = (e) => {
    //Validation

    if (this.state.adminEmail == "" && this.state.adminPassword == "") {
      return swal("Error!", "Cannot submit empty fields.", "error");
    }

    if (!this.state.recaptchaRef) {
      return swal("reCAPTCHA Failed", "Please complete reCAPTCHA verification.", "error");
    }

    // console.log(this.state.adminEmail);
    // console.log(this.state.adminPassword);

    fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        adminEmail: this.state.adminEmail,
        adminPassword: this.state.adminPassword,
      }),
    })
      .then((callback) => callback.json())
      .then((callbackJson) => {
        if (callbackJson.authToken) {
          localStorage.setItem("username", callbackJson.username);
          localStorage.setItem("authToken", callbackJson.authToken);
          fakeAuth.isAuthenticated = true;
          this.setState(
            {
              ...this.state.loginFunction,
            },
            this.props.loginFunc
          );
          swal("Logged in successfully!", "No warnings!", "success");
        } else {
          swal("Error!", "Incorrect Credentials", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };


  render() {

    const google = () => {
      window.open("http://localhost:5000/auth/google", "_self");
    };

    const facebook = () => {
      window.open("http://localhost:5000/auth/facebook", "_self");
    };

    return (
      <div className="login-parent">
        <div className="login-name">
          <h1 className="title-login">
            {" "}
            <img src={person}></img>
            <br></br> LOGIN
          </h1>
        </div>
        <div className="login-form">
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className={"text-white"}>
                <i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;Admin Name
              </label>
              <input
                required
                name="adminEmail"
                onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={this.state.adminEmail}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className={"text-white"}>
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>&nbsp;Admin
                Password
              </label>
              <input
                name="adminPassword"
                onChange={this.onChangeHandler}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={this.state.adminPassword}
                required
              />
            </div>
            <ReCAPTCHA
              onChange={(e) => {
                this.setState({
                  recaptchaRef: e,
                });
              }}
              sitekey="6Lc0tT8pAAAAAFdCInz-l12JGAFY-Rup18ypNq1W"
            />
            <button
              type="button"
              className="submit-button"
              onClick={() => this.onSubmitHandler()}
            >
              <i className="fa fa-send"></i>&nbsp; Login
            </button>
          </form>
          <div>
            <p className="s-or">OR SIGN-IN WITH</p>
            <div className="provider-container">
              <img onClick={google} className="icon" src={googleIcon} />
              <img onClick={facebook} className="icon" src={fbIcon} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Login;
