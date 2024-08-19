/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Users from "./components/Users";
import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Home from "./components/Home";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn && (
        <Navbar expand="lg" bg="info-subtle" variant="dark" text="body">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link color="black" onClick={handleLogout} href="#">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
      )}
      <Routes>
        <Route
          path="/"
          element={<Home setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} component={Blog} />
      </Routes>
    </div>
  );
};

export default App;
