import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogsGetter } from "../reducers/blogReducer";
import LoginForm from "./LoginForm";
import Header from "./Header";
import Blogs from "./Blogs";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Home = ({ loggedIn, setLoggedIn }) => {
  const blogRef = useRef();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(blogsGetter());
  }, []);

  if (!loggedIn) {
    return (
      <div className="container">
        <h2>Log in to the application</h2>
        {message !== "" && <p id="message-box">{message}</p>}
        <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
    );
  }
  return (
    <div className="container">
      <Header />
      {message !== "" && <p id="message-box">{message}</p>}
      <Blogs />
      <h2>Create new blog</h2>
      <Togglable buttonLabel="Create note" ref={blogRef}>
        <BlogForm />
      </Togglable>
    </div>
  );
};

export default Home;
