import React, { useEffect } from "react";
import Login from "./Login";
import SignUp from "../signup/SignUp";
import Navbar from "../Navbar/Navbar";
import Contact from "../Contact/Contact";
import Dashboard from "../Dashboard/Dashboard";
import Add from "../Add/Add";
import Tours from "../Tours/Tours";
import Edit from "../Edit/Edit";
import ViewTours from "../ViewTours//ViewTours";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

function MyHome() {

  useEffect(() => {

    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log(resObject);
          localStorage.setItem("username", resObject.username);
          localStorage.setItem("authToken", resObject.authToken);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route path="/dashboard" exact element={<Dashboard />}></Route>

          <Route path="/contact" exact element={<Contact />}></Route>

          <Route path="/add" exact element={<Add />}></Route>

          {/* <PrivateRoute path="/dashboard">
              <AuthButton />
              <Dashboard />
            </PrivateRoute> */}

          {/* <PrivateRoute path="/add">
              <AuthButton />
              <Add />
            </PrivateRoute> */}

          <Route path="/login" exact element={<LoginPage />}></Route>

          <Route path="/signup" exact element={<SignUp />}></Route>

          <Route path="/edit" exact element={<Edit />}></Route>

          <Route path="/view" exact element={<ViewTours />}></Route>

          <Route path="/tours"
            element={
              <PrivateRoute>
                <Tours />
              </PrivateRoute>
            }
          />

          <Route path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          {/* <Route path="/signup" component={SignUp}></Route> */}
        </Routes>
      </div>
    </Router>
  )
}

export default MyHome

//Authentication of Login
export const fakeAuth = {
  isAuthenticated: false,

  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signOut(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

// function AuthButton() {
//   let history = useHistory();

//   return fakeAuth.isAuthenticated ? (
//     <div className={"row justify-content-center  p-2"}>
//       {/* <label className={"text-black mr-5"}>You are now logged in...</label> */}

//       {/* <button
//         className={"btn btn-danger"}
//         onClick={() => {
//           fakeAuth.signOut(() => history.push("/home"));
//         }}
//       >
//         <i className="fa fa-send"></i>&nbsp; Sign out
//       </button> */}
//     </div>
//   ) : (
//     <div>
//       <p>You are not logged in.</p>
//       <button type={"button"} onClick={LoginPage()}>
//         Log in
//       </button>
//     </div>
//   );
// }

function PrivateRoute({ children }) {

  console.log('hello')
  let auth = localStorage.getItem('authToken');

  return auth ? children : <Navigate to="/login" />;

}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/tours" } } || { from: { pathname: "/admin" } };

  //here login is a callback function
  let login = () => {
    fakeAuth.authenticate(() => {
      navigate(from)
    });
  };

  return (
    <div>
      <Login loginFunc={login} />
    </div>
  );
}
