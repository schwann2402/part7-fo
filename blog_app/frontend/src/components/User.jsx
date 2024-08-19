import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.login.users).find(
    (user) => user.id === id
  );
  if (!user) {
    return null;
  }
  return (
    <div className="container">
      <p>
        Welcome: <b>{user.name}</b>!
      </p>
      <p>Your blogs</p>
      {user.blogs.map((blog) => (
        <div>Title: {blog.title}</div>
      ))}
    </div>
  );
};

export default User;
