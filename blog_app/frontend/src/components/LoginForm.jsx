import useField from "../hooks/useField.js";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { redirect, useNavigate } from "react-router-dom";

const LoginForm = ({ setLoggedIn, loggedIn }) => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      blogService.setToken(user.token);
      localStorage.setItem("loggedUser", JSON.stringify(user));
      setLoggedIn(true);
      redirect("/");
    } catch (error) {
      dispatch(setNotification("Invalid username or password"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };

  if (!loggedIn) {
    return (
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label> USERNAME </Form.Label>
          <Form.Control {...username} placeholder="Enter the username" />
        </Form.Group>
        <Form.Group>
          <Form.Label> PASSWORD </Form.Label>
          <Form.Control {...password} placeholder="Enter the password" />
        </Form.Group>
        <Button type="submit">Log in</Button>
      </Form>
    );
  }
};

export default LoginForm;
