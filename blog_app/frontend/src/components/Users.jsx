import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../reducers/userReducer";
import { useEffect } from "react";
import { blogsGetter } from "../reducers/blogReducer";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import User from "./User";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(blogsGetter());
  }, []);
  const users = useSelector((state) => state.login.users);
  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {users.map((user) => {
              return (
                <td key={user.id}>
                  <Link to={`../user/${user.id}`}>{user.name}</Link>
                </td>
              );
            })}
          </tr>
          <tr>
            {users.map((user) => {
              return <td key={user.id}>{user.blogs.length}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
